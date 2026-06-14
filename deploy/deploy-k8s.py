#!/usr/bin/env python3
"""
Deploy the Ninetech app stack to Kubernetes using kubectl.
Prometheus, Loki, and Grafana are all provided by the lab cluster.
Nothing monitoring-infrastructure-related is deployed here except monitoring manifests.
"""
import os
import re
import sys
import subprocess
import time
from pathlib import Path

def log(msg):
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {msg}")

def error(msg: str):
    log(f"ERROR: {msg}")
    sys.exit(1)

def run(cmd: list[str], capture=False) -> str:
    try:
        if capture:
            result = subprocess.run(cmd, capture_output=True, text=True, check=True)
            return result.stdout.strip()
        else:
            subprocess.run(cmd, check=True)
            return ""
    except subprocess.CalledProcessError as e:
        error(f"Command failed: {' '.join(cmd)}\n{e.stderr}")

def kubectl_apply_from_cmd(cmd: list[str]) -> None:
    """Run a --dry-run=client -o yaml | kubectl apply -f -."""
    yaml_out = run(cmd, capture=True)
    try:
        subprocess.run(
            ["kubectl", "apply", "-f", "-"],
            input=yaml_out, text=True, check=True
        )
    except subprocess.CalledProcessError as e:
        error(f"kubectl apply failed: {e.stderr}")

def substitute_env(content: str) -> str:
    """Replace ${VAR} placeholders with environment variable values."""
    for key, value in os.environ.items():
        content = content.replace(f"${{{key}}}", value)
    return content

def main():
    required = [
        "CI_COMMIT_REF_NAME",
        "CI_COMMIT_SHA",
        "CI_REGISTRY_IMAGE",
        "KUBE_NAMESPACE",
        "MAILPIT_URL",
    ]
    missing = [var for var in required if not os.getenv(var)]
    if missing:
        error(f"Missing required environment variables: {', '.join(missing)}")

    branch = os.getenv("CI_COMMIT_REF_NAME")
    sha_short = os.getenv("CI_COMMIT_SHA")[:8]
    registry_image = os.getenv("CI_REGISTRY_IMAGE")
    namespace = os.getenv("KUBE_NAMESPACE")
    mailpit_url = os.getenv("MAILPIT_URL")

    # CI_COMMIT_REF_SLUG is set automatically by GitLab, but we want to ensure it is a valid Kubernetes label value.
    if not os.getenv("CI_COMMIT_REF_SLUG"):
        slug = re.sub(r'[^a-z0-9]+', '-', branch.lower()).strip("-")
        os.environ["CI_COMMIT_REF_SLUG"] = slug 
        log(f"CI_COMMIT_REF_SLUG not set, generated slug: {slug}")
    
    os.environ["IMAGE_TAG"] = sha_short

    log("Deploying Ninetech app stack to Kubernetes...")
    log(f"Branch: {branch}")
    log(f"Image: {registry_image}:{sha_short}")
    log(f"Namespace: {namespace}")

    log("Applying Kubernetes manifests...")
    k8s_dir = Path(__file__).parent.parent / "k8s"

    app_files =[
        "services.yaml",
        "DB-statefulset.yaml",
        "backend-migrations-job.yaml",
        "backend-deployment.yaml",
        "mailpit-deployment.yaml",
        "frontend-deployment.yaml",
        "monitoring-manifests.yaml",
        "ingress.yaml",
        "hpa.yaml",
        "db-nw-policy.yaml",
    ]

    for filename in app_files:
        filepath = k8s_dir / filename
        if not filepath.exists():
            log(f"Warning: {filename} not found")
            continue

        log(f"Applying {filename}...")
        content = substitute_env(filepath.read_text())

        try:
            result = subprocess.run(
                ["kubectl", "apply", "-f", "-"],
                input=content, text=True, capture_output=True, check=True
            )
            if result.stdout:
                log(f"kubectl output: {result.stdout.strip()}")
        except subprocess.CalledProcessError as e:
            error(f"Failed to apply {filename}: {e.stderr}")
        
    log("Waiting for deployments to be ready...")
    deployments = ["backend-deployment", "frontend"]
    for deploy in deployments:
        log(f"Waiting for {deploy} deployment to be ready...")
        try:
            run([
                "kubectl", "rollout", "status",
                f"deployment/{deploy}",
                f"--namespace={namespace}",
                "--timeout=10m",
            ])
            log(f"deployment {deploy} is ready")
        except Exception:
            log(f"Warning: {deploy} deployment not ready yet (may still be pulling image)")

    log("Waiting for database StatefulSet to be ready...")
    try:
        run([
            "kubectl", "rollout", "status",
            "statefulset/database",
            f"--namespace={namespace}",
            "--timeout=10m",
        ])
        log("database StatefulSet is ready")
    except Exception:
        log("Warning: database StatefulSet not ready yet (may still be initializing)")

    log("Service URLs:")
    try:
        ingress_host = run([
            "kubectl", "get", "ingress",
            "--namespace", namespace,
            "-o", "jsonpath={.items[0].spec.rules[0].host}",
        ], capture=True)
        if ingress_host:
            log(f"Frontend:      https://{ingress_host}")
            log(f"Frontend PROD: https://athletiqa.cc.k3s.chas-lab.dev")
            log(f"Backend:       https://{ingress_host}/api")
            log(f"Mailpit:       https://{mailpit_url}")
    except Exception as e:
        log(f"Error occurred while fetching ingress host: {e}")

    log(f"Grafana: https://grafana.cc.k3s.chas-lab.dev (cluster-provided)")

    log("\n Deployment complete!")
    log(f"kubectl get all -n {namespace}")
    log(f"kubectl logs -n {namespace} -f <pod-name>")

if __name__ == "__main__":
    main()