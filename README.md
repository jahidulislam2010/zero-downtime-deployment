# Zero-Downtime Deployment with Blue/Green & Canary Strategies

A small demonstration project using Node.js, Docker, Docker Compose, Nginx and GitHub Actions.

## Architecture
Browser → Nginx reverse proxy (port 8080) → v1 Blue or v2 Green/Canary.

The default Nginx configuration uses weighted upstream servers: v1 weight 95 and v2 weight 5. This is a request-distribution demonstration, not a guarantee that exactly 5% of a small sample will reach v2.

## Requirements
- Docker Desktop / Docker Engine with the Compose plugin
- Git and a GitHub repository (for CI workflow)

## Run locally
From the project root:

```bash
docker compose up --build -d
docker compose ps
```

Open http://localhost:8080 and refresh several times. The response should identify either `v1 (Blue)` or `v2 (Green/Canary)`. Test the health endpoints directly:
- http://localhost:8080/health (routed through Nginx)
- `docker compose exec v1 node -e "fetch('http://localhost:3001/health').then(r=>r.text()).then(console.log)"`
- `docker compose exec v2 node -e "fetch('http://localhost:3002/health').then(r=>r.text()).then(console.log)"`

Stop:
```bash
docker compose down
```

## Blue/Green switch
The `nginx/blue-only.conf` and `nginx/green-only.conf` files show the traffic target for a full Blue/Green switch. To switch the live proxy, copy the desired file over `nginx/nginx.conf`, then rebuild/recreate Nginx:

```bash
# Blue only
cp nginx/blue-only.conf nginx/nginx.conf
docker compose up --build -d nginx

# Green only
cp nginx/green-only.conf nginx/nginx.conf
docker compose up --build -d nginx
```

To restore the default 95/5 canary configuration, restore the upstream block in `nginx/nginx.conf` from the README description or version control, then rebuild Nginx. If using Windows PowerShell, copy the chosen config with `Copy-Item`.

## CI/CD
The workflow `.github/workflows/ci-cd.yml` builds all three Docker images on pushes and pull requests to `main`. It validates image builds; it does not deploy to a cloud host automatically.

## Troubleshooting
- Port 8080 busy: change the left side of `8080:80` in `docker-compose.yml`.
- Nginx 502: check `docker compose ps` and `docker compose logs nginx v1 v2`.
- Workflow build failure: verify paths and that Dockerfiles are committed.
- Canary sample seems uneven: weighted routing is probabilistic; use many requests before interpreting percentages.

## Evidence to capture before submission
1. GitHub repository Code page showing files.
2. Successful GitHub Actions run (green check).
3. Browser showing the application response at `localhost:8080`.
4. `docker compose ps` showing all three services running.

Do not claim a test passed unless you actually ran it and captured the result.
