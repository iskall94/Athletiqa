ARG CI_REGISTRY_IMAGE
FROM ${CI_REGISTRY_IMAGE}/utilities:latest

WORKDIR /deploy
COPY deploy/deploy.py deploy.py
COPY deploy/delete-stack.py delete-stack.py

RUN chmod +x deploy.py delete-stack.py

ENTRYPOINT ["/bin/sh"]