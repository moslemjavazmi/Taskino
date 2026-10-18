# Getting Started

> **Verify in code:** The exact Node.js version, package manager version, root scripts, environment variables, service ports, and Docker Compose services must be taken from the current repository. Commands below are a safe inspection sequence, not a claim that every command already exists.

## Prerequisites

- Git
- Node.js version required by the repository's `engines` field or CI configuration
- npm version compatible with the lockfile and workspace setup
- Docker Engine and Docker Compose plugin, if local infrastructure is containerized
- Environment values for services that require database, messaging, email, or external API access

Do not install a different package manager or regenerate the lockfile without first checking the repository's conventions.

## 1. Clone and inspect

```bash
git clone <YOUR_REPOSITORY_URL>
cd taskino
git status
node --version
npm --version
```

Inspect the root manifest and workspace definitions before installing:

```bash
cat package.json
cat turbo.json
```

On Windows PowerShell, use `Get-Content package.json` if `cat` is unavailable.

## 2. Install dependencies

Use the package manager and lockfile already committed to the repository. If the repository uses npm and has a valid `package-lock.json`, the usual reproducible install is:

```bash
npm ci
```

If there is no npm lockfile, stop and determine the intended package manager rather than assuming `npm ci` will work.

## 3. Configure environment variables

- Find each service's environment variable references and example environment files.
- Create local `.env` files from safe example templates.
- Never commit populated `.env` files or real credentials.
- Verify that required values are documented in [Security Notes](security.md).

Do not invent variable names. Generate the final variable reference from the source code and configuration.

## 4. Start infrastructure

Inspect `docker-compose.yml` first. If it defines the required local dependencies, start only after reviewing the services and exposed ports:

```bash
docker compose config
docker compose up -d
docker compose ps
```

Check logs when a dependency is unhealthy:

```bash
docker compose logs --tail=200
```

## 5. Run applications and services

Read the actual `scripts` in the root and each workspace's `package.json`. Add verified commands here, for example:

```bash
# Replace these examples with scripts confirmed in package.json
npm run dev
npm run build
npm run test
```

For a monorepo, document whether each command runs all workspaces or requires a workspace filter.

## 6. Verify the local environment

- [ ] Every required container is healthy.
- [ ] Each backend service starts with valid configuration.
- [ ] The gateway can reach the configured upstreams.
- [ ] Each frontend builds and can reach the expected API base URL.
- [ ] Database migrations have been applied using the project's actual migration procedure.
- [ ] Kafka topics are created automatically or by a documented setup step.
- [ ] A basic end-to-end task flow succeeds, if implemented.

## Troubleshooting

| Symptom | Checks |
|---|---|
| Port already in use | Check Compose port mappings and running processes |
| Database connection refused | Check container health, hostnames, ports and credentials |
| Kafka connection errors | Check advertised listeners and whether the client uses the correct network address |
| Frontend API errors | Check base URL, gateway routing, CORS and browser network logs |
| Workspace dependency errors | Check package manager, lockfile and workspace globs |
| Authentication fails | Check environment configuration, token issuer/audience, clock and cookie settings |

Add actual service ports, scripts, migration commands, and screenshots only after verifying them against the current code.
