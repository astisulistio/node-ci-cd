pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
        APP_NAME = 'node-ci-cd'
        TEST_REPORT_DIR = 'test-reports'
    }

    parameters {
        string(name: 'DEPLOY_ENV', defaultValue: 'staging', description: 'Deployment environment')
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/astisulistio/node-ci-cd.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Unit Tests') {
            steps {
                bat 'npm test -- --reporter mocha-multi-reporters --reporter-options configFile=config/test-reporter.json'
            }
        }

        stage('Run Integration Tests') {
            steps {
                bat 'npm run integration-test'
            }
        }

        stage('Build Application') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Deploy to Staging') {
            when {
                branch 'main'
            }
            steps {
                bat 'npm run deploy-staging'
            }
        }

        stage('Branch-Specific Tests') {
            when {
                expression {
                    env.BRANCH_NAME == 'develop' || env.BRANCH_NAME == 'main'
                }
            }
            steps {
                script {
                    if (env.BRANCH_NAME == 'develop') {
                        bat 'npm run test-develop'
                    } else if (env.BRANCH_NAME == 'main') {
                        bat 'npm run test-main'
                    }
                }
            }
        }

        stage('Notify on Success') {
            steps {
                emailext subject: "Build Succeeded",
                         body: "The build succeeded! View the logs for more details.",
                         to: "dev-team@example.com"
            }
        }

        stage('Notify on Failure') {
            when {
                expression {
                    currentBuild.result == 'FAILURE'
                }
            }
            steps {
                emailext subject: "Build Failed",
                         body: "The build failed. Please check the logs.",
                         to: "dev-team@example.com"
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
