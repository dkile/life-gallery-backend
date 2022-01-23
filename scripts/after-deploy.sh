#!/bin/bash
REPOSITORY=/home/ubuntu/life-gallery-backend

cd $REPOSITORY

npm install
pm2 reload api