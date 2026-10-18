# Review and Rating Service

> Status: **Verify in code**. This document describes intended responsibility based on the repository layout; confirm behavior against the current implementation.

## 1. Purpose

Describe the business capability owned by this service and the problem it solves.

## 2. Responsibilities

- List responsibilities that this service actually implements.
- State what belongs to another service.
- Distinguish implemented behavior from planned behavior.

## 3. Runtime and dependencies

| Item | Value |
|---|---|
| Repository path | `backend/ReviewRating` |
| Runtime | Verify in code |
| Framework | Verify in code |
| Start/build scripts | Verify in `package.json` |
| Listening port | Verify in code/config |
| Required services | Verify in code/config |

## 4. API contract

Document actual routes. Do not use illustrative routes as production facts.

| Method | Path | Purpose | Auth / permission |
|---|---|---|---|
| Verify in code | Verify in code | Verify in code | Verify in code |

For each endpoint include request schema, response schema, HTTP status codes, validation errors, and an example with non-sensitive dummy data.

## 5. Data model and ownership

- Database engine and database/schema name:
- ORM or driver:
- Tables/collections and key relationships:
- Unique constraints and indexes:
- Migration command:
- Data owned by this service:
- Cross-service data dependencies:

## 6. Events and asynchronous communication

| Direction | Topic / event | Payload schema | Trigger / consumer |
|---|---|---|---|
| Verify in code | Verify in code | Link to schema | Verify in code |

Document retry behavior, duplicate handling, consumer group, ordering assumptions, dead-letter handling, and replay procedure only if configured.

## 7. Security

- Authentication mechanism:
- Authorization rules:
- Input validation:
- Rate limiting:
- Sensitive data handled:
- Audit logging:
- Secrets/configuration:

## 8. Failure handling and observability

Describe timeouts, dependency failures, error mapping, logs, metrics, tracing, health checks, and recovery behavior.

## 9. Testing

Record exact commands and tests that exist. Include unit, integration, contract, and end-to-end tests where applicable.

## 10. Local development

List exact environment variables (names and safe descriptions, never real values), prerequisites, startup commands, and a smoke test.

## 11. Open questions

- [ ] Confirm routes and schemas.
- [ ] Confirm database ownership.
- [ ] Confirm event producers/consumers.
- [ ] Confirm security behavior.
- [ ] Confirm test and startup commands.
