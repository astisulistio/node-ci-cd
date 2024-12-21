pipeline {
    agent any

    environment {
        NODE_ENV = 'development'  // Default environment
        APP_NAME = 'node-ci-cd'
        TEST_REPORT_DIR = 'test-reports'
    }

    parameters {
        string(name: 'DEPLOY_ENV', defaultValue: 'staging', description: 'Deployment environment')
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Checkout from the correct GitHub branch
                    echo "Running on branch: ${env.BRANCH_NAME}"
                    // Ensure correct branch is checked out dynamically
                    git branch: "${env.BRANCH_NAME}", url: 'https://github.com/astisulistio/node-ci-cd.git'
                }
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

        stage('Deploy') {
            steps {
                script {
                    // Deploy based on DEPLOY_ENV parameter
                    if (params.DEPLOY_ENV == 'staging') {
                        echo "Deploying to Staging"
                        bat 'npm run deploy-staging'
                    } else if (params.DEPLOY_ENV == 'production') {
                        echo "Deploying to Production"
                        bat 'npm run deploy-production'
                    } else {
                        echo "Deploying to Development"
                        bat 'npm run deploy-development'
                    }
                }
            }
        }

        stage('Branch-Specific Tests') {
            when {
                expression {
                    return (env.BRANCH_NAME == 'develop' || env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'feature/update-jenkinsfile')
                }
            }
            steps {
                script {
                    if (env.BRANCH_NAME == 'develop') {
                        bat 'npm run test-develop'
                    } else if (env.BRANCH_NAME == 'main') {
                        bat 'npm run test-main'
                    } else if (env.BRANCH_NAME == 'feature/update-jenkinsfile') {
                        bat 'npm run test-feature'
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
                    return currentBuild.result == 'FAILURE'
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
            cleanWs() // Clean up the workspace after each build
        }
    }
}
