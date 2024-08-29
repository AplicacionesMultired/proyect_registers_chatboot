pipeline {
    agent any
    
    tools {
        nodejs 'node-v22'
    }

    environment {
        ENV_API_CHAT_BOT = credentials('ENV_API_CHAT_BOT')
        ENV_CLIENT_CHAT_BOT = credentials('ENV_CLIENT_CHAT_BOT')
        ENV_TNSNAMES = credentials('ENV_TNSNAMES')

    }
    
    stages {
        stage('Copy .env files') {
            steps {
                script {
                    def envApiContent = readFile(ENV_API_CHAT_BOT)
                    def envClientContent = readFile(ENV_CLIENT_CHAT_BOT)
                    def envTnsNamesContent = readFile(ENV_TNSNAMES)
                    
                    writeFile file: './api/.env', text: envApiContent
                    writeFile file: './client/.env', text: envClientContent
                    writeFile file: './api/tnsnames.ora', text: envTnsNamesContent
                }
            }
        }

        stage('Copy packages for build image'){
          steps {
              script {
                sh 'cp /var/lib/jenkins/utils/instantclient-basic-linux.x64-11.2.0.4.0.zip ./api'
                sh 'cp /var/lib/jenkins/utils/node-v20.17.0-linux-x64.tar.xz ./api'
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
                    def images = 'api-chat:v_1.2'
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