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
                script {
                    // Set the branch to 'feature-new' as per the user request
                    if (env.BRANCH_NAME == null || env.BRANCH_NAME == '') {
                        echo "Branch name not found, defaulting to 'feature-new'"
                        env.BRANCH_NAME = 'feature-new'  // Set to 'feature-new' branch
                    }
                    echo "Running on branch: ${env.BRANCH_NAME}"

                    // Checkout the correct branch
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
                bat 'npm test'  // Runs Jest for all unit tests
            }
        }

        stage('Run Integration Tests') {
            steps {
                script {
                    echo "Running Integration Tests"
                    // Log the current working directory to verify paths
                    echo "Current directory: ${pwd()}"
                    echo "Files in the current directory:"
                    bat 'dir'

                    // Run the specific test file with a fixed path and ensure Jest matches it
                    bat 'npx jest tests/smtp-test.test.js --verbose --maxWorkers=2 --passWithNoTests'
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
