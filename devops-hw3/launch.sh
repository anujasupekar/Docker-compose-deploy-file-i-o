#!/bin/bash
PORT="$1"
docker build -t sample/sample /root/devops-hw4/devops-hw3/ 
docker run -d -p $PORT:3000 sample/sample
