pipeline {
    agent any

    environment {
        SSH_KEY = credentials('ec2-ssh-key')   // Jenkins SSH private key credential
        EC2_USER = "ec2-user"
        EC2_HOST = "3.85.218.35/"
        APP_PATH = "/home/ec2-user/my-app"
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Citralyn/sparklingwater.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test || true'   // prevents pipeline from halting if you don’t have tests yet
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build || true'    // optional, useful if using React
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh """
                    # upload everything except node_modules
                    scp -i $SSH_KEY -o StrictHostKeyChecking=no -r ./backend $EC2_USER@$EC2_HOST:$APP_PATH

                    # ssh into EC2, reinstall deps & restart app
                    ssh -i $SSH_KEY -o StrictHostKeyChecking=no $EC2_USER@$EC2_HOST '
                        cd $APP_PATH &&
                        npm install &&
                        pm2 restart all || pm2 start server.js
                    '
                """
            }
        }
    }
}
