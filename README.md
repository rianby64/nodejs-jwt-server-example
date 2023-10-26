# Server xsrf-token example

Just show how this type of authentication works.

```bash
podman build -t server-xsrf-token-example .
podman run --rm --network cni-podman1 -it --name server-xsrf-token-example server-xsrf-token-example

podman run --rm --network cni-podman1 -it brightsec/cli repeater ...
```