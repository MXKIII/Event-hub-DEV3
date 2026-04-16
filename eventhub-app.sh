#!/bin/bash 

echo "********************************"
echo "CONSTRUCTION DE L'APPLICATION SUR LE PORT 5000"
docker compose up -d --build
echo "********************************"
date