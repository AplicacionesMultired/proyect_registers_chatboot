pipeline {
    agent any
    
    tools {
        nodejs 'node-v22'
    }

    environment {
        ENV_API_CHAT_BOT = credentials('ENV_API_CHAT_BOT')
        ENV_CLIENT_CHAT_BOT = credentials('ENV_CLIENT_CHAT_BOT')
    }
    
    stages {
        stage('Copy .env files') {
            steps {
                script {
                    def envApiContent = readFile(ENV_API_CHAT_BOT)
                    def envClientContent = readFile(ENV_CLIENT_CHAT_BOT)
                    
                    writeFile file: './api/.env', text: envApiContent
                    writeFile file: './client/.env', text: envClientContent
                }
            }
        }
        stage('install dependencies') {
            steps {
                script {
                    sh 'cd ./client && yarn'
                    sh 'cd ./client && yarn build'
                }
            }
        }

        stage('down docker compose'){
            steps {
                script {
                    sh 'docker compose down'
                }
            }
        }
        stage('delete images'){
            steps{
                script {
                    def images = 'api-chat:v_1.0'
                    if (sh(script: "docker images -q ${images}", returnStdout: true).trim()) {
                        sh "docker rmi ${images}"
                    } else {
                        echo "Image ${images} does not exist."
                        echo "continuing..."
                    }
                }
            }
        }
        stage('run docker compose'){
            steps {
                script {
                    sh 'docker compose up -d'
                }
            }
        }
    }
}