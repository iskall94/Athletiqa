#!/usr/bin/env python3
import os, sys, requests

required = ["CI_COMMIT_REF_SLUG", "PORTAINER_PASSWORD", "PORTAINER_USERNAME"]
missing = [v for v in required if not os.getenv(v)]
if missing:
    sys.exit(f"Missing required environment variables: {', '.join(missing)}")

branch = os.getenv("CI_COMMIT_REF_SLUG")
portainer_password = os.getenv("PORTAINER_PASSWORD")
portainer_username = os.getenv("PORTAINER_USERNAME")

stack = f"ninetech-{branch}"
portainer_url = "https://portainer.doe25.swarm.chas-lab.dev/api"

def api(method, url, **kwargs):
    resp = requests.request(method, url, **kwargs)
    if not resp.ok:
        sys.exit(f"API {method} {url} failed [{resp.status_code}]: {resp.text}")
    if resp.text:
        try:
            return resp.json()
        except Exception:
            sys.exit(f"API {method} {url} returned non-JSON [{resp.status_code}]: {resp.text}")
    return None

# Authentication
token = api("POST", f"{portainer_url}/auth", json={"Username": portainer_username, "Password": portainer_password})["jwt"]
headers = {"Authorization": f"Bearer {token}"}

# Get endpoint ID
endpoints = [e["Id"] for e in api("GET", f"{portainer_url}/endpoints", headers=headers) if e["Name"] == "local-swarm"]
endpoint_id = endpoints[0] if endpoints else sys.exit("Endpoint 'local-swarm' not found")

# Search and remove stack
stacks = api("GET", f"{portainer_url}/stacks", headers=headers)
stack_id = next((s["Id"] for s in stacks if s["Name"] == stack and s["EndpointId"] == endpoint_id), None)

if stack_id:
    print(f"Removing stack: {stack}")
    api("DELETE", f"{portainer_url}/stacks/{stack_id}?endpointId={endpoint_id}", headers=headers)
    print("Stack removed")
else:
    print(f"Stack not found: {stack}")