#!/bin/bash

echo "********************************"
echo "CONSTRUCTION DE L'APPLICATION SUR LE PORT 80"
docker compose up -d --build
echo "********************************"
date