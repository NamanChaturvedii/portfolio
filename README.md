# Portfolio: DevSecOps CI/CD Pipeline

Every push to `main` triggers a Jenkins pipeline that scans, builds, tests and ships my React portfolio as a Docker image to AWS ECR.

## Pipeline
GitHub push → webhook → Jenkins →
1. **Gitleaks**: secret scanning (caught a real leaked DB credential, rotated and removed)
2. **OWASP Dependency-Check**: dependency CVEs (build-time-only findings marked unstable)
3. **SonarQube**: static code analysis with a Quality Gate
4. **Docker**: multi-stage build (Node build → Nginx serve)
5. **Trivy**: image scan, blocks HIGH/CRITICAL (fixed a libxml2 CVE with `apk upgrade`)
6. **Smoke test**: `/health` check on the running container
7. **Push to ECR**: versioned image, IAM role auth (no stored keys)
8. **Slack**: build status alerts

## Infrastructure (Terraform)
- EC2 Jenkins server, bootstrapped by `user_data` (Jenkins, Docker, SonarQube)
- Security group: SSH key-only, Jenkins/SonarQube restricted to my IP and GitHub webhook ranges
- ECR repo: immutable tags, scan on push, keeps last 10 images
- IAM role + instance profile for ECR access

## Tech
Jenkins · Docker · Nginx · SonarQube · Trivy · Gitleaks · OWASP Dependency-Check · Terraform · AWS (EC2, ECR, IAM) · Slack
