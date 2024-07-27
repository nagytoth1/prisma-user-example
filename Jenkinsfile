pipeline {
    agent any
    environment{
        LOCAL_IMAGE_NAME = "pue-app:${env.BUILD_ID}" // local name for the image (on the host)
        REGISTRY_REPO_NAME = "nagytoth/pue" // public name for the image (on DockerHub)
        REGISTRY_URL="https://index.docker.io/v1/"            // the URL of the registry/artifactory
    }
    stages {
        stage('Build') { 
            steps {
                script{
                    // build the app based on Dockerfile that can be found in the repository's root directory
                    echo 'Building Docker image locally...'
                    docker.build(env.LOCAL_IMAGE_NAME)
                }
            }
        }

        stage('Push'){
            steps{
                script{
                    // tag the docker image before pushing it to the registry
                    echo 'Tagging Docker image...'
                    // sh "docker tag ${env.LOCAL_IMAGE_NAME} ${REGISTRY_REPO_NAME}:${env.BUILD_ID}"

                    echo "Pushing Docker image to the artifactory... ${env.REGISTRY_URL}/${env.REGISTRY_REPO_NAME}:${env.BUILD_ID}"
                    // docker.withRegistry(env.REGISTRY_URL, 'dockerhub-push-credentials') {
                    //     // docker push nagytoth/react-jenkins-example:tagname
                    //     sh "docker push ${env.REGISTRY_REPO_NAME}:${env.BUILD_ID}"
                    // }
                }
            }
        }

        stage('Cleaning up local image') { 
            steps {
                script{
                    echo 'Removing Docker image locally...'
                    // remove local image with tagged image as well
                    // sh "docker rmi -f ${env.LOCAL_IMAGE_NAME} ${env.REGISTRY_REPO_NAME}:${env.BUILD_ID}"
                }
            }
        }
    }
}