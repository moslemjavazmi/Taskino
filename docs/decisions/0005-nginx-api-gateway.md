# ADR-0005: Nginx and API Gateway

## Status

Proposed / verify

## Context

The repository includes Nginx configuration and an API Gateway component.

## Decision

Use Nginx and the gateway according to explicit, non-overlapping responsibilities defined by configuration.

## Alternatives considered

Nginx only; application gateway only; direct service exposure.

## Consequences

A clear edge design can centralize routing and policy, but duplicated routing/auth logic can cause confusion. Document TLS termination, trust boundaries, and upstream access.

## Evidence to attach

`infra/nginx`, gateway routes/middleware, Compose port mappings, and deployment config.

> Before publishing: replace the status with the real decision status and edit this record to reflect the actual choice. This draft is not evidence that the decision has been implemented.
