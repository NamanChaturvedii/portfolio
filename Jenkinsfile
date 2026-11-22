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
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('client') {
                    sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
                }
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
        failure {
            echo "Build #${env.BUILD_NUMBER} failed: check the stage logs above"
        }
    }
}
