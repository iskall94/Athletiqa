# GitLab CI/CD Variables — Monitoring Stack
All secrets are stored as **GitLab CI/CD Variables**, and never committed to the repository.

## Where to set them
**GitLab → Your project → Settings → CI/CD → Variables → Add variable**

Mark sensitive values as **Masked** so they never appear in job logs.
Mark variables that should only apply to protected branches as **Protected**.

You only need to manually add:

Variable	Reason	Who sets it
KUBE_NAMESPACE	Your school namespace	You (once)
KUBE_SERVER	Your K3s API URL	You (once)
KUBE_TOKEN	K8s auth token	Lab admin
DB_PASSWORD	MSSQL sa password	You (once)
LOKI_URL	School's Loki endpoint	Lab admin provides value
IMAGE_TAG	(optional) Docker image tag	Auto-set to $CI_COMMIT_SHORT_SHA if not defined