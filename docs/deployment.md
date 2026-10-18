# Deployment Guide

## Scope

This guide is a deployment checklist, not a claim that Taskino is already deployed to production. Add provider-specific instructions only after choosing and testing the target environment.

## Deployment topology to document

- Frontend hosting and public URLs for customer, provider, and admin applications.
- Nginx placement and TLS termination.
- API Gateway deployment and upstream service addresses.
- Backend service process/container configuration.
- PostgreSQL and MongoDB deployment/backup approach, if used.
- Kafka broker topology, advertised listeners, persistence, and monitoring.
- Secret management and environment-specific configuration.
- Logging, metrics, traces, health checks, and alerting.
- Migration, rollback, and recovery procedures.

## Pre-deployment checklist

- [ ] Build all required workspaces from a clean checkout.
- [ ] Run automated tests and record results.
- [ ] Verify the production environment variables and their sources.
- [ ] Ensure debug endpoints and admin routes are protected.
- [ ] Confirm CORS, cookie flags, TLS, and trusted proxy settings.
- [ ] Confirm Nginx and gateway route tables.
- [ ] Apply database migrations using a reviewed procedure.
- [ ] Confirm database backups and restore steps.
- [ ] Confirm Kafka listener configuration and access controls.
- [ ] Define retry, restart, and health-check behavior.
- [ ] Verify webhook signature validation for any payment provider.
- [ ] Run a post-deployment smoke test.
- [ ] Document rollback and incident response steps.

## Docker Compose

For local development, first inspect the actual Compose file:

```bash
docker compose config
docker compose up -d
docker compose ps
docker compose logs --tail=200
```

Do not expose databases, Kafka, or administration interfaces publicly unless there is an explicit security design. Local development port mappings are not a production deployment plan.

## Environment separation

Keep local, test, staging, and production configuration separate. Do not commit secret-bearing `.env` files. Document variable names and purpose, not secret values.

## Observability

At minimum, document how to inspect service logs, health, dependency connectivity, failed Kafka messages, and database availability. If metrics or distributed tracing are not yet implemented, list them as future work rather than claiming coverage.
