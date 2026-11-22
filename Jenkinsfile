pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    environment {
        IMAGE_NAME = 'portfolio'
        IMAGE_TAG  = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'git clean -fdx'
            }
        }

        stage('Secret Scan (Gitleaks)') {
            steps {
                sh '''
                    docker run --rm -v "$WORKSPACE:/repo" \
                      ghcr.io/gitleaks/gitleaks:latest \
                      dir /repo --redact -v
                '''
            }
        }

        stage('Dependency Scan (OWASP)') {
            steps {
                withCredentials([string(credentialsId: 'nvd-api-key', variable: 'NVD_KEY')]) {
                    catchError(buildResult: 'UNSTABLE', stageResult: 'UNSTABLE') {
                        sh '''
                            mkdir -p $HOME/owasp-data
                            docker run --rm -u $(id -u):$(id -g) \
                              -v "$WORKSPACE:/src" \
                              -v "$HOME/owasp-data:/usr/share/dependency-check/data" \
                              owasp/dependency-check:latest \
                              --scan /src/client \
                              --project portfolio \
                              --format HTML --format JSON \
                              --out /src/reports \
                              --nvdApiKey "$NVD_KEY" \
                              --failOnCVSS 9 \
                              --disableYarnAudit
                        '''
                    }
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: 'reports/*', allowEmptyArchive: true
                }
            }
        }

        stage('SonarQube Analysis') {
            environment {
                SCANNER_HOME = tool 'sonar-scanner'
            }
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh '''
                        $SCANNER_HOME/bin/sonar-scanner \
                          -Dsonar.projectKey=portfolio \
                          -Dsonar.projectName=portfolio \
                          -Dsonar.sources=client/src \
                          -Dsonar.qualitygate.wait=true
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('client') {
                    sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
                }
            }
        }

        stage('Image Scan (Trivy)') {
            steps {
                sh '''
                    mkdir -p $HOME/trivy-cache
                    docker run --rm \
                      -v /var/run/docker.sock:/var/run/docker.sock \
                      -v $HOME/trivy-cache:/root/.cache/ \
                      aquasec/trivy:latest image \
                      --severity HIGH,CRITICAL \
                      --ignore-unfixed \
                      --exit-code 1 \
                      --no-progress \
                      $IMAGE_NAME:$IMAGE_TAG
                '''
            }
        }

        stage('Smoke Test') {
            steps {
                sh '''
                    docker rm -f portfolio-smoke || true
                    docker run -d --name portfolio-smoke -p 8085:80 $IMAGE_NAME:$IMAGE_TAG
                    sleep 5
                    curl -fsS http://localhost:8085/health
                '''
            }
        }
    }

    post {
        always {
            sh 'docker rm -f portfolio-smoke || true'
        }
        success {
            echo "Build #${env.BUILD_NUMBER} passed: image ${IMAGE_NAME}:${IMAGE_TAG} is healthy"
        }
        unstable {
            echo "Build #${env.BUILD_NUMBER} unstable: check the OWASP report in Build Artifacts"
        }
        failure {
            echo "Build #${env.BUILD_NUMBER} failed: check the stage logs above"
        }
    }
}
