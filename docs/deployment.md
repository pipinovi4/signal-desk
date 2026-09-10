# Deployment and operations

Status: deployment planning checklist. Docker, Compose, and Nginx files are placeholders, not a working deployment.

## Before the first deployment

- [ ] Build service images and document required runtime configuration.
- [ ] Define service networking, persistent storage, readiness, and health checks.
- [ ] Configure secrets outside version control and restrict database/broker access.
- [ ] Document migrations, release order, rollback limits, and compatibility.
- [ ] Configure TLS and proxy routing for any public endpoints.
- [ ] Set resource limits and graceful worker shutdown behavior.

## Operational documentation to add

- Structured logs and correlation IDs without secrets or unnecessary event content.
- Queue backlog, processing latency, delivery failures, and AI fallback counts.
- Backup schedules, retention, and a verified PostgreSQL restore procedure.
- Failed-message inspection and controlled replay without duplicate effects.
- Procedures for AI outages, broker outages, expired credentials, and delivery failures.

Do not publish deployment commands or recovery guarantees until verified against the implemented system.
