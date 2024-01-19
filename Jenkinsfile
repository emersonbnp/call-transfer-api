pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh "npm install"
        sh "npm run build"
         - wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb
         - dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb
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