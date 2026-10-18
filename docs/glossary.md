# Glossary

| Term | Meaning |
|---|---|
| API Gateway | An entry component that routes requests and may apply cross-cutting policies such as authentication. Exact Taskino responsibilities must match the code. |
| Backend service | A deployable/runtime component responsible for a defined business capability. |
| Consumer group | Kafka consumers coordinated to share work from topic partitions. |
| Dead-letter queue (DLQ) | A destination for messages that cannot be processed normally, if configured. |
| Idempotency | A property that makes repeating an operation safe with respect to its intended side effects. |
| Kafka event | A record published to a Kafka topic to communicate that something happened or that work is requested. |
| Monorepo | A repository that contains multiple applications/packages. |
| Nginx reverse proxy | A proxy that forwards incoming requests to configured upstreams. |
| OpenAPI | A machine-readable specification for HTTP APIs. |
| Outbox pattern | A design that records an event in the same database transaction as business state, then publishes it asynchronously. |
| Prisma | A TypeScript-friendly database ORM/toolkit used by some project components according to project notes. |
| Refresh token | A credential used to obtain new access tokens under the system's refresh policy. |
| Service boundary | The ownership boundary around a business capability and its data/operations. |
| Topic | A named Kafka stream to which producers publish records and consumers subscribe. |
| Turborepo | A build system for JavaScript/TypeScript monorepos. |
| Eventual consistency | A model where related state across components may temporarily differ and converge after asynchronous processing. |
