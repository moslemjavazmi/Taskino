# ADR-0002: Backend service boundaries

## Status

Proposed / verify

## Context

The domain includes authentication, user profiles, tasks, offers, search, and reviews.

## Decision

Keep business responsibilities separated by service boundaries where this is reflected in runtime ownership.

## Alternatives considered

A single backend application; different service decomposition.

## Consequences

Independent boundaries can improve ownership and deployment flexibility but introduce network failures, distributed consistency, duplicated operational work, and more complex local development.

## Evidence to attach

Service entry points, routes, database schemas, Docker Compose, and cross-service calls.

> Before publishing: replace the status with the real decision status and edit this record to reflect the actual choice. This draft is not evidence that the decision has been implemented.
