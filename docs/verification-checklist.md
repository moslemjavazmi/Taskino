# Documentation Verification Checklist

Use this before treating the documentation as final or publishing it as a portfolio artifact.

## Repository and build

- [ ] Check exact directory names and case.
- [ ] Read root `package.json`, lockfile, `turbo.json`, and `tsconfig.base.json`.
- [ ] Record actual Node.js and package manager versions.
- [ ] Verify root and workspace scripts.
- [ ] Build all three frontend applications.
- [ ] Build/typecheck each backend service.

## Infrastructure

- [ ] Read all of `docker-compose.yml`.
- [ ] Record actual container names, images, ports, volumes, networks, health checks, and dependencies.
- [ ] Verify Kafka listeners from both host and container networks.
- [ ] Read Nginx configuration and compare it with gateway routes.
- [ ] Confirm database service ownership and migration commands.

## Service behavior

- [ ] Read each service's entry point and route registration.
- [ ] Record actual request/response schemas.
- [ ] Inspect database schemas and migrations.
- [ ] Identify real Kafka producers, consumers, topics, and event schemas.
- [ ] Confirm authentication and authorization behavior.
- [ ] Confirm retry, idempotency, and error-handling behavior.
- [ ] Verify chat/payment status and paths before documenting them.

## Diagrams and claims

- [ ] Every arrow in the architecture diagram corresponds to a real or explicitly planned connection.
- [ ] Planned flows are visibly labeled as planned.
- [ ] Task state names match enums and transition code.
- [ ] API examples match actual endpoint behavior.
- [ ] No unimplemented test, monitoring, deployment, or AI capability is claimed as complete.
- [ ] All internal links work.
- [ ] No secrets or personal data are present.

## Portfolio readiness

- [ ] Add a short demo video or screenshots only if they reflect the current build.
- [ ] Explain one or two meaningful engineering trade-offs with evidence.
- [ ] Include known limitations and next steps.
- [ ] Add the repository URL and live demo URL only if they are valid and public.
- [ ] Add the chosen license before accepting external contributions.
