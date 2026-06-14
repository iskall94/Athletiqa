#!/usr/bin/env python3
import os, requests, sys, subprocess

required = ["CI_COMMIT_REF_SLUG", "CI_REGISTRY_IMAGE", "CI_COMMIT_SHA", "DB_PASSWORD", "PORTAINER_PASSWORD", "PORTAINER_USERNAME"]
missing = [v for v in required if not os.getenv(v)]
if missing:
    sys.exit(f"Missing required environment variables: {', '.join(missing)}")

branch = os.getenv("CI_COMMIT_REF_SLUG")
registry = os.getenv("CI_REGISTRY_IMAGE")
sha = os.getenv("CI_COMMIT_SHA")[:8]
db_password = os.getenv("DB_PASSWORD")
portainer_password = os.getenv("PORTAINER_PASSWORD")
portainer_username = os.getenv("PORTAINER_USERNAME")

stack = f"ninetech-{branch}"
portainer_url = "https://portainer.doe25.swarm.chas-lab.dev/api"

os.environ["CI_REGISTRY_IMAGE"] = registry
os.environ["IMAGE_TAG"] = sha
os.environ["DB_PASSWORD"] = db_password
os.environ["STACK_NAME"] = stack

def api(method, url, **kwargs):
    resp = requests.request(method, url, **kwargs)
    if not resp.ok:
        sys.exit(f"API {method} {url} failed [{resp.status_code}]: {resp.text}")
    try:
        return resp.json()
    except Exception:
        sys.exit(f"API {method} {url} returned non-JSON [{resp.status_code}]: {resp.text}")

# Authentication
token = api("POST", f"{portainer_url}/auth", json={"Username": portainer_username, "Password": portainer_password})["jwt"]
headers = {"Authorization": f"Bearer {token}"}

# Get IDs
endpoints = [e["Id"] for e in api("GET", f"{portainer_url}/endpoints", headers=headers) if e["Name"] == "local-swarm"]
environment_ID = endpoints[0] if endpoints else sys.exit("Environment 'local-swarm' not found")

swarm_id = api("GET", f"{portainer_url}/endpoints/{environment_ID}/docker/swarm", headers=headers)["ID"]

# Use envsubst to prepare compose
try:
    with open("../docker-compose.yaml") as f:
        result = subprocess.run(
            ["envsubst"],
            stdin=f,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=True
        )
    compose = result.stdout
except subprocess.CalledProcessError as e:
    print(f"envsubst failed: {e.stderr}")
    sys.exit(1)

# Search existing stack
stacks = api("GET", f"{portainer_url}/stacks", headers=headers)
stack_id = next((s["Id"] for s in stacks if s["Name"] == stack and s["EndpointId"] == environment_ID), None)

# Deploy or update stack
if not stack_id:
    print(f"Creating stack: {stack}")
    api("POST", f"{portainer_url}/stacks/create/swarm/file?endpointId={environment_ID}", headers=headers,
        files={"file": ("docker-compose.yml", compose)}, data={"Name": stack, "SwarmID": swarm_id})
else:
    print(f"Updating stack: {stack}")
    api("PUT", f"{portainer_url}/stacks/{stack_id}?endpointId={environment_ID}", headers=headers,
        json={"prune": True, "RepullImageAndRedeploy": True, "stackFileContent": compose})

print(f"https://app.{stack}.doe25.swarm.chas-lab.dev")