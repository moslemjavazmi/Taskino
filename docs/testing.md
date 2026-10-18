# Testing Strategy

## Current evidence

The test framework, test scripts, and coverage have not been audited in this documentation draft. Do not claim a test suite exists until the package manifests and test files confirm it.

## Recommended test layers

### Unit tests
Test business rules in isolation: task state transitions, offer validation, permission checks, input validation, and helper functions.

### Integration tests
Test a service against its real dependencies or controlled test instances: database persistence, migrations, Kafka producer/consumer behavior, and authentication storage.

### Contract tests
Check that frontend clients, gateway routes, and service endpoints agree on request/response schemas. For Kafka, validate event payloads against the shared event contracts.

### End-to-end tests
Exercise critical user journeys through the public entry point, such as sign-in and task creation, using a controlled test environment.

## Commands

Replace the placeholders below with commands verified in the root and workspace `package.json` files:

```bash
npm run test
npm run build
```

If scripts differ by workspace, document the exact workspace filter and whether the command is run from the repository root.

## Test data and environment

- Use isolated test databases and topics.
- Do not run destructive integration tests against production.
- Keep credentials in environment variables or a secret manager.
- Ensure tests clean up created data.
- Avoid asserting exact timing for asynchronous events unless the test uses appropriate polling/timeouts.
- Include negative tests for invalid permissions, duplicate requests, malformed events, and dependency failures.

## Evidence to publish

| Check | Result | Command / CI link |
|---|---|---|
| Frontend build | Not audited | Add verified command |
| Backend build/typecheck | Not audited | Add verified command |
| Unit tests | Not audited | Add verified command |
| Integration tests | Not audited | Add verified command |
| End-to-end critical flow | Not audited | Add verified command |
