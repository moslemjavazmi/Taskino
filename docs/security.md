# Security Notes

## Security scope

This document is a checklist for the Taskino implementation. It is not a security audit or a certification. Verify each control in code and test it before claiming it is enforced.

## Authentication and authorization

- Validate JWT signature, allowed algorithm, issuer, audience, expiry, and relevant claims.
- Do not confuse authentication (who the caller is) with authorization (what the caller may do).
- Enforce permissions on the backend, not only in frontend navigation.
- Use short-lived access tokens and a documented refresh/revocation strategy.
- Protect OTP and MFA flows against brute force, replay, and account enumeration.
- Secure session cookies with appropriate `HttpOnly`, `Secure`, and `SameSite` settings when cookies are used.
- Validate trusted-device lifecycle and revocation behavior if supported.

## API and input handling

- Validate all request bodies, path parameters, and query parameters.
- Apply rate limits to sensitive endpoints.
- Use explicit CORS allowlists where browser access is required.
- Avoid leaking stack traces, tokens, internal hostnames, or database errors to clients.
- Set timeouts and size limits for requests and uploads.
- Use least-privilege credentials for services and infrastructure.

## Kafka and service-to-service security

- Restrict broker and topic access to authorized services.
- Validate event schemas and treat event payloads as untrusted input.
- Handle duplicate delivery safely where consumers may retry.
- Avoid including credentials, secrets, or unnecessary personal data in events.
- Document TLS and authentication between services and the broker if configured.

## Payments and webhooks (if implemented)

- Verify provider webhook signatures using the provider's documented method.
- Make handlers idempotent and persist event identifiers when appropriate.
- Never trust a browser redirect alone as proof of payment.
- Do not store raw payment credentials unless the system is explicitly designed and compliant to do so.
- Keep test and live provider credentials separate.

## Secrets and privacy

Never commit:
- `.env` files containing actual credentials
- JWT signing secrets or private keys
- API keys, OTPs, refresh tokens, or session cookies
- Real customer records or personal data

Provide `.env.example` files with placeholder values only. Rotate any credential that was accidentally exposed.

## Security verification checklist

- [ ] Authorization tests cover cross-user and cross-role access.
- [ ] JWT invalid/expired/wrong-audience cases are tested.
- [ ] OTP rate limits and expiry are tested.
- [ ] Refresh token reuse/revocation behavior is tested if supported.
- [ ] CORS and cookie settings match deployment.
- [ ] Error responses do not leak sensitive internals.
- [ ] Secrets are absent from Git history and logs.
- [ ] Webhook signature and duplicate-event handling are tested if applicable.
