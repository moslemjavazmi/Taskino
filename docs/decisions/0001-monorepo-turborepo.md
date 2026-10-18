# ADR-0001: Monorepo with Turborepo

## Status

Proposed / verify

## Context

The repository contains multiple frontend applications, backend services, and shared packages. Coordinated type and package changes may span these components.

## Decision

Keep the components in a single repository and use the existing npm workspace/Turborepo configuration if that is the active setup.

## Alternatives considered

Separate repositories; a monorepo without task orchestration.

## Consequences

Shared code and atomic changes can be easier to manage. The trade-offs include workspace configuration complexity, build graph correctness, and CI scope. Record measured benefits only if measured.

## Evidence to attach

Root `package.json`, `turbo.json`, workspace package manifests, and CI configuration.

> Before publishing: replace the status with the real decision status and edit this record to reflect the actual choice. This draft is not evidence that the decision has been implemented.
