# Architecture Decision Records

Architecture Decision Records (ADRs) capture why a meaningful technical decision was made, what alternatives were considered, and what trade-offs resulted.

Only mark an ADR **Accepted** if the decision is real and reflected in the project. Use **Proposed** for future work.

## Suggested decisions

- [ADR-0001: Monorepo and Turborepo](0001-monorepo-turborepo.md)
- [ADR-0002: Service boundaries](0002-service-boundaries.md)
- [ADR-0003: Kafka for asynchronous communication](0003-kafka-events.md)
- [ADR-0004: Data ownership](0004-data-ownership.md)
- [ADR-0005: Nginx and API Gateway](0005-nginx-api-gateway.md)

## ADR template

```markdown
# ADR-NNNN: Decision title

## Status
Proposed | Accepted | Superseded

## Context
What problem, requirement, or constraint led to this decision?

## Decision
What was chosen, and what is explicitly out of scope?

## Alternatives considered
What alternatives were considered, and why were they not selected?

## Consequences
Benefits, costs, risks, and operational responsibilities.

## Evidence
Links to source files, tests, configuration, benchmarks, or incidents.
```
