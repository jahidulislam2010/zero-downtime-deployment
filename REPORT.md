# Zero-Downtime Deployment with Blue/Green & Canary Strategies

**Student:** [Your Name]  
**Course/Module:** [Your Course / Module]  
**Lecturer:** [Lecturer Name]  
**Date:** [Submission Date]

## 1. Introduction
This project demonstrates deployment approaches designed to reduce or avoid application downtime during releases. It uses two versions of a small Node.js web application, Docker containers, Nginx traffic routing, Docker Compose, and a GitHub Actions build workflow.

## 2. Objectives
- Run two versions of an application concurrently.
- Route HTTP requests through Nginx.
- Demonstrate weighted Canary routing and configuration-based Blue/Green switching.
- Containerise services with Docker and orchestrate them using Docker Compose.
- Automatically build the images when code is pushed to GitHub.

## 3. Tools and Technologies
- **Node.js:** serves the two simple application versions.
- **Docker:** packages each app and the reverse proxy into images.
- **Docker Compose:** runs the three services together.
- **Nginx:** routes requests to v1 and v2.
- **GitHub Actions:** builds the images on pushes and pull requests.

## 4. Architecture
A user sends a request to Nginx on port 8080. Nginx forwards the request to either v1 (Blue) on port 3001 or v2 (Green/Canary) on port 3002. The default configuration assigns weights of 95 to v1 and 5 to v2. Separate Nginx configuration files illustrate routing all traffic to Blue or all traffic to Green.

**Architecture flow:** Browser → Nginx reverse proxy → v1 Blue / v2 Green.

## 5. Implementation
1. Created separate Node.js servers for v1 and v2, each with a home page and `/health` endpoint.
2. Added a Dockerfile for each app and a Dockerfile for Nginx.
3. Defined the v1, v2, and Nginx services in `docker-compose.yml`.
4. Configured Nginx weighted upstream routing for a 95/5 Canary example.
5. Added Blue-only and Green-only Nginx configurations to demonstrate a full traffic switch.
6. Created a GitHub Actions workflow that builds the three Docker images when changes are pushed to or proposed for `main`.

## 6. Testing Plan and Results
Run these checks and fill in the actual outcomes before submitting:

| Test | How to check | Actual result |
|---|---|---|
| Build and start services | `docker compose up --build -d` | [Record result] |
| Services running | `docker compose ps` | [Record result] |
| Application accessible | Open `http://localhost:8080` | [Record result] |
| Health endpoint | Open `http://localhost:8080/health` | [Record result] |
| CI image build | Check GitHub Actions run | [Record result] |
| Blue/Green switch | Change Nginx config to Blue-only or Green-only and rebuild | [Record result] |

**Important:** Do not describe these tests as successful until you have run them. Add screenshots as evidence.

## 7. Limitations
The default weighted Nginx setup is a learning demonstration; the observed proportion may vary in small samples. The GitHub Actions workflow builds images but does not publish them to a registry or deploy them to a cloud service. Production use would need stronger automated tests, health-aware routing, monitoring, secure image publishing, and a deployment/rollback process.

## 8. Conclusion
The project provides a practical introduction to containerised deployment and traffic management. Docker Compose runs two application versions behind Nginx, while weighted routing demonstrates Canary release concepts and separate configurations demonstrate Blue/Green switching. GitHub Actions automates image-build validation. Further work could add automated tests, monitoring, and cloud deployment.

## 9. Evidence Checklist
- [ ] Screenshot of GitHub repository files
- [ ] Screenshot of successful GitHub Actions run
- [ ] Screenshot of the application in a browser
- [ ] Screenshot of `docker compose ps`
- [ ] Completed test results table
