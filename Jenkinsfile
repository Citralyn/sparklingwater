pipeline {
    agent any

    environment {
        SSH_KEY = credentials('jenkinschickenapplekey')   // Jenkins SSH private key credential
        EC2_USER = "ec2-user"
        EC2_HOST = "44.210.80.200"
        APP_PATH = "/home/ec2-user/my-app"
        MONGO_URI = credentials('mongo_uri')  
        JWT_SECRET = credentials('jwt_secret')  

    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Citralyn/sparklingwater.git'
            }
        }


        stage("Prepare EC2 dir") {
            steps {
                sh """
                    ssh -i $SSH_KEY -o StrictHostKeyChecking=no $EC2_USER@$EC2_HOST "mkdir -p $APP_PATH"
                """
            }
        }

        stage("Upload everything") {
            steps {
                sh """
                    # upload everything except node_modules
                    scp -i $SSH_KEY -o StrictHostKeyChecking=no -r ./backend $EC2_USER@$EC2_HOST:$APP_PATH
                """
            }
        }

        stage("create .env on ec2") {
            steps {
                sh """ 
                    ssh -i $SSH_KEY -o StrictHostKeyChecking=no $EC2_USER@$EC2_HOST << EOF
cd $APP_PATH
cat > .env <<EOT
MONGO_URI=${MONGO_URI}
JWT_SECRET=${JWT_SECRET}
EOT
EOF
                """
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh """
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
