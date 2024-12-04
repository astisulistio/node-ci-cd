pipeline {
    agent any
    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/astisulistio/node-ci-cd.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                powershell '''
                    # Check if Node.js and npm are installed
                    node --version
                    npm --version
                    # Install npm dependencies
                    npm install
                '''
            }
        }

        stage('Run Unit Tests') {
            steps {
                powershell 'npm test'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the application...'
                // Tambahkan perintah build jika diperlukan
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // Tambahkan perintah deploy jika diperlukan
            }
        }
    }

    post {
        success {
            echo 'Pipeline finished successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
