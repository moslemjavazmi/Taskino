# Project Status and Scope

## Purpose

This page distinguishes the project's intended architecture from behavior confirmed by a source-code audit. It should be updated after every meaningful milestone.

## Known repository components

The following directories are part of the supplied repository structure:

- Three Next.js applications: customer (`u-app`), service provider (`t-app`), and administration (`admin-app`).
- Backend directories for API Gateway, authentication, users, tasks, offers, search, and reviews/ratings.
- Shared packages for API access, authentication SDK/store, shared types, UI components, and Kafka event contracts.
- Nginx infrastructure configuration, Docker Compose, Turborepo, TypeScript base configuration, and a root package manifest.

A directory existing does not prove that its service is complete, production-ready, or deployed.

## Previously described implementation progress

Project notes have described authentication, user, task, offers, search, and Kafka/event-driven work as implemented or substantially developed. Chat and payment have been described as ongoing in earlier project discussions. This is historical context, not a fresh code audit; verify the current branch before publishing specific completion claims.

## Status table to complete

| Capability | Status | Evidence / follow-up |
|---|---|---|
| Customer application | Verify in code | Routes, screens, build command |
| Provider application | Verify in code | Routes, screens, build command |
| Admin application | Verify in code | Routes, permissions, build command |
| API Gateway | Verify in code | Proxy routes, token validation, error handling |
| Authentication | Verify in code | OTP, refresh/session lifecycle, MFA behavior |
| User/profile service | Verify in code | Models, endpoints, verification workflow |
| Task lifecycle | Verify in code | State machine and transition guards |
| Offer service | Verify in code | Offer creation, acceptance, expiry rules |
| Search/matching | Verify in code | Indexing/search method, event integration |
| Review/rating | Verify in code | Eligibility, aggregation, moderation |
| Kafka integration | Verify in code | Topic names, producers, consumers, retries |
| Chat | In progress / verify | Socket.IO, persistence, authorization |
| Payment | In progress / verify | Provider integration, webhook verification, idempotency |
| Automated tests | Verify in code | Commands and results |
| Local Docker environment | Verify in code | Clean startup and health checks |
| Production deployment | Not asserted | Add URL and deployment evidence only if deployed |
| AI/agent features | Planned unless verified | Keep separate from core shipped capabilities |

## Release-readiness checklist

- [ ] Clean install succeeds from documented steps.
- [ ] All listed applications build.
- [ ] Docker Compose starts all documented dependencies.
- [ ] Health checks and logs are understood.
- [ ] API examples match real routes and schemas.
- [ ] Event topics and payloads match source code.
- [ ] Secrets are provided via environment configuration, not committed.
- [ ] Tests are run and results recorded.
- [ ] README statements match the actual implementation.
- [ ] No planned AI capability is presented as shipped.
