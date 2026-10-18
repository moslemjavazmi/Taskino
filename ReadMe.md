# Taskino

> A service marketplace project designed to connect customers with service providers through task requests, provider offers, and a managed task lifecycle.

[![TypeScript](https://img.shields.io/badge/TypeScript-primary-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js-black)](https://nextjs.org/)
[![Architecture](https://img.shields.io/badge/Architecture-service--oriented-informational)](docs/architecture/overview.md)
[![Status](https://img.shields.io/badge/Status-in%20development-yellow)](docs/project-status.md)

Taskino is an independent portfolio project exploring the design of a service marketplace with separate customer, service-provider, and administration applications. Its repository is organized as a TypeScript monorepo, with backend services and shared packages. Kafka is part of the intended event-driven communication architecture where integrations are implemented.

> **Documentation accuracy note:** This repository documentation is an initial architecture-oriented draft based on the currently known repository structure and project notes. It has not yet been verified against every source file, environment variable, route, database schema, or deployment target. Sections explicitly marked **Verify in code** must be checked before treating them as authoritative.

## Product goals

- Let customers create service requests and follow their lifecycle.
- Support service providers who review requests and submit offers.
- Provide administrative workflows where implemented.
- Separate business capabilities into maintainable backend services.
- Explore asynchronous communication using Kafka.
- Share reusable types, API utilities, authentication utilities, and UI components across applications.

## Repository map

```text
taskino/
├── Frontend/
│   └── app/
│       ├── u-app/          # Customer Next.js application
│       ├── t-app/          # Service-provider Next.js application
│       └── admin-app/      # Administration Next.js application
├── backend/
│   ├── APIGateway/         # Request routing and authentication boundary
│   ├── auth/               # OTP, MFA, sessions and authentication
│   ├── User/               # Profiles, skills and verification
│   ├── Task/               # Task/order lifecycle
│   ├── Offer-service/      # Provider offers
│   ├── SearchService/      # Search and matching
│   └── ReviewRating/       # Reviews and ratings
├── Share/
│   ├── EventBus/           # Shared Kafka event contracts
│   └── packages/
│       ├── api-client/
│       ├── auth-sdk/
│       ├── auth-store/
│       ├── types/
│       └── ui-kit/
├── infra/
│   └── nginx/              # Reverse-proxy configuration
├── docs/                   # Project documentation
├── docker-compose.yml
├── turbo.json
├── tsconfig.base.json
└── package.json
```

This map reflects the supplied repository layout. Confirm exact casing and paths on disk; some operating systems treat path casing differently.

## Architecture at a glance

See [Architecture Overview](docs/architecture/overview.md) and the editable [system context diagram](docs/architecture/diagrams/system-context.mmd).

The intended high-level request path is:

1. A customer, provider, or administrator uses the relevant Next.js application.
2. Requests pass through the configured reverse proxy and API gateway, according to the actual deployment setup.
3. The gateway routes requests to backend services.
4. Services own their respective business responsibilities.
5. Kafka is used for asynchronous events only along flows implemented by producers and consumers.
6. Data stores and external integrations must be documented per service after inspecting the actual configuration.

## Technology overview

| Area | Known or intended technology | Verification needed |
|---|---|---|
| Web applications | Next.js, TypeScript, Tailwind CSS | Confirm versions and app scripts |
| Backend | Node.js, Express, TypeScript | Confirm per-service dependencies |
| Monorepo | npm workspaces, Turborepo | Confirm root scripts and workspace globs |
| Messaging | Kafka | Confirm topics, producers, consumers, retry/DLQ behavior |
| Databases | PostgreSQL/Prisma and MongoDB are used or planned in project components | Map each database to the actual service |
| Edge/reverse proxy | Nginx | Confirm routes, TLS termination and upstreams |
| Local infrastructure | Docker Compose | Confirm services, ports, health checks and volumes |

## Documentation

- [Getting Started](docs/getting-started.md)
- [Project Status](docs/project-status.md)
- [Architecture Overview](docs/architecture/overview.md)
- [Architecture Decision Records](docs/decisions/README.md)
- [API Documentation Guide](docs/api/README.md)
- [Service Documentation](docs/services/README.md)
- [Task Lifecycle](docs/flows/task-lifecycle.md)
- [Authentication Flow](docs/flows/authentication.md)
- [Kafka Event Flow](docs/flows/kafka-events.md)
- [Testing Guide](docs/testing.md)
- [Deployment Guide](docs/deployment.md)
- [Security Notes](docs/security.md)
- [Glossary](docs/glossary.md)
- [Documentation Verification Checklist](docs/verification-checklist.md)

## Current status

Taskino is an independent project under development. Consult [Project Status](docs/project-status.md) for the distinction between known components, planned work, and items that require verification. Do not interpret the architecture diagrams as proof that every depicted integration is already complete.

## Contributing to the documentation

1. Keep documentation close to the code and update it in the same change as behavior.
2. Prefer concrete examples verified against source code.
3. Mark planned behavior as planned; do not document it as shipped.
4. Never commit real credentials, tokens, personal data, or production secrets.
5. Keep Mermaid source files editable and review diagram changes in pull requests.

## License

Add the project's chosen license here before publishing the repository publicly.
