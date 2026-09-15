# Nginx

`nginx.dev.conf` and `nginx.conf` make nginx the HTTP entry point for development and production respectively. Both route `/api/` to the FastAPI backend and all other requests to Next.js. The development configuration keeps long-lived upgraded connections open for Next.js hot reload.

TLS, domains, rate limiting, and production security headers are not configured yet. See the [deployment guide](../docs/deployment.md).
