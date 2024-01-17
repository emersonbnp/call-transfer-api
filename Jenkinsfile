pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh "npm install"
        sh "npm run build"
        sh "npm run test"
        sh "npm run sonar"
        sh "docker build -t call-transfer-api:0.0.1 ."   
        print("image successfully built")
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deploying....'
      }
    }
  }
}
