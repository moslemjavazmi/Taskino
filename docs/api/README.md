# API Documentation

## Recommended approach

Use OpenAPI to describe HTTP APIs in a machine-readable format. This enables consistent endpoint definitions and can power interactive documentation. Keep the OpenAPI files synchronized with the real implementation.

- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [Swagger Editor](https://editor.swagger.io/)

## Suggested layout

```text
docs/api/
├── README.md
├── openapi/
│   ├── gateway.yaml
│   ├── auth.yaml
│   ├── user.yaml
│   └── task.yaml
└── examples/
```

Use one specification per service or a single multi-tag specification, depending on how the APIs are deployed and versioned. Do not create separate specifications merely for appearance if the actual API boundaries are not clear.

## Endpoint checklist

For each endpoint, document:
- HTTP method and path
- Summary and business purpose
- Path/query parameters and request body
- Response schema and example
- Authentication and authorization requirements
- Expected HTTP status codes and error schema
- Idempotency requirements for operations that may be retried
- Pagination, filtering and sorting conventions
- Rate limits and operational constraints, if configured

## OpenAPI starter

Copy this minimal example into a new YAML file and replace all placeholders with verified route details. It is a template, not an existing Taskino API contract.

```yaml
openapi: 3.1.0
info:
  title: Taskino Service API
  version: 0.1.0
  description: Replace with the verified service contract.
servers:
  - url: http://localhost:REPLACE
paths:
  /REPLACE:
    get:
      summary: Replace with an implemented endpoint
      responses:
        "200":
          description: Successful response
```

Never document a route, schema, or status code based only on a guessed convention.
