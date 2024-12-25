pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
        APP_NAME = 'node-ci-cd'
        TEST_REPORT_DIR = 'test-reports'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'feature-new', url: 'https://github.com/astisulistio/node-ci-cd.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                bat 'npm run deploy-staging'
            }
        }
    }

    post {
        always {
            cleanWs()  // Clean workspace after each build
        }
    }
}
