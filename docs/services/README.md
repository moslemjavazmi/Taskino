# Service Documentation Index

Each service document should be completed from the service's source code, routes, schemas, configuration, and tests.

## Backend services

- [API Gateway](api-gateway.md)
- [Authentication](auth.md)
- [User](user.md)
- [Task](task.md)
- [Offer Service](offer-service.md)
- [Search Service](search-service.md)
- [Review and Rating](review-rating.md)

## Additional components to document if present

Project notes have also mentioned payment and chat components. They are not present in the supplied folder tree, so their current repository paths and status must be verified before adding them to the canonical service map.

For every service, fill in:
- Runtime entry point and start script
- Environment variables
- Routes and request/response schemas
- Database and migration ownership
- Kafka topics and event contracts
- Authentication and authorization requirements
- Error handling, retries and timeouts
- Tests and reproducible test commands
