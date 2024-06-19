pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'docker build -t manage-image:${BUILD_NUMBER} .'
                echo 'remove running manage container'
                sh 'docker stop manage-container || true'
                sh 'docker rm manage-container || true'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker run -d --name manage-container -p 3333:3333 manage-image:${BUILD_NUMBER}'
            }
        }
        stage('Cleanup') {
            steps {
                echo 'removing unused artifacts'
                sh 'docker system prune -af'
            }
        }
    }
}