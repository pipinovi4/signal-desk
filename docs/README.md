# SignalDesk documentation

SignalDesk is currently a repository scaffold. Service entry points, dependency files, Dockerfiles, and deployment configuration are placeholders; there is no working application yet. These pages describe intended behavior and the documentation to complete as implementation progresses.

| Document | Purpose |
| --- | --- |
| [Architecture](architecture.md) | Service responsibilities, event flow, and failure handling |
| [Repository structure](project-structure.md) | Current layout and proposed naming improvements |
| [Development](development.md) | Local setup and configuration checklist |
| [Event contract](events.md) | Proposed normalized event format and queue behavior |
| [Integrations](integrations.md) | Requirements for source adapters and delivery channels |
| [Testing](testing.md) | Planned test layers and acceptance scenarios |
| [Deployment](deployment.md) | Deployment, operations, and recovery checklist |
| [Architecture decisions](decisions/README.md) | Record significant design decisions |

Keep verified implementation details separate from proposals. Add commands only after they work against the repository. Use synthetic payloads and sanitized configuration examples; never include credentials or real personal notification content.
