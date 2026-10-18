# ADR-0003: Kafka for asynchronous communication

## Status

Proposed / verify

## Context

Some business events may trigger downstream work that should not be coupled to the original HTTP request.

## Decision

Use Kafka for asynchronous workflows where producers and consumers are implemented.

## Alternatives considered

Synchronous HTTP only; another broker; in-process events.

## Consequences

Kafka can decouple consumers and buffer workloads but introduces eventual consistency, duplicate processing, schema evolution, monitoring, and operational overhead.

## Evidence to attach

EventBus contracts, producer/consumer code, topic configuration, Compose setup, and tests.

> Before publishing: replace the status with the real decision status and edit this record to reflect the actual choice. This draft is not evidence that the decision has been implemented.
