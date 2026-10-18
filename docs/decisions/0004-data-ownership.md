# ADR-0004: Database ownership

## Status

Proposed / verify

## Context

The project notes mention PostgreSQL/Prisma and MongoDB for different workloads. Exact ownership must be established.

## Decision

Assign clear ownership for each business entity and document any cross-service data access. Do not claim database-per-service until verified.

## Alternatives considered

Shared database/schema; isolated databases; mixed approach.

## Consequences

Clear ownership reduces accidental coupling. Separate stores increase migration and consistency complexity. The chosen model should match the real code and scale needs.

## Evidence to attach

Prisma schemas, database connection configuration, MongoDB clients, migrations, and Compose volumes.

> Before publishing: replace the status with the real decision status and edit this record to reflect the actual choice. This draft is not evidence that the decision has been implemented.
