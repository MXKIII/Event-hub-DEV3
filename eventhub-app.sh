#!/bin/bash

echo "********************************"
echo "CONSTRUCTION DE L'APPLICATION SUR LE PORT 5000"

docker cp $(hostname):/var/jenkins_home/workspace/EventHubJob/nginx/default.conf /tmp/nginx-default.conf

export NGINX_CONF_PATH=/tmp/nginx-default.conf
docker compose up -d --build

echo "********************************"
date