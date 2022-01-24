#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

REPOSITORY=/home/ubuntu/life-gallery-backend

cd $REPOSITORY

npm install

LENGTH=`pm2 pid api | wc -m`
echo $LENGTH
if [ $LENGTH -lt 5 ] || [ $LENGTH -gt 90 ]
then
    npm start
else
    pm2 reload api
fi