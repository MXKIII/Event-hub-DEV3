pipeline {
  agent any
  stages {
    stage('Preparation') {
      steps {
        script {
          try {
            sh 'docker compose down'
          } catch (Exception e) {
            echo "No existing containers to stop."
          }
        }
      }
    }
    stage('Build') {
      steps {
        build job: 'EventHubJob'
      }
    }
    stage('Results') {
      steps {
        build job: 'TestEventHubJob'
      }
    }
  }
};