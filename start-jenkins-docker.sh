#!/bin/bash
# this is how you start Jenkins in order to make docker inside Jenkins work, yey
docker run \
  -d \
  -v ~/jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /usr/bin/docker:/usr/bin/docker \
  -p 8080:8080 \
  -p 50000:50000 \
  --name jenkins-container \
  jenkins/jenkins:lts