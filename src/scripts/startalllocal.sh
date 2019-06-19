#!/bin/bash

function run {
	echo $(pwd) $1
	gnome-terminal --tab -- bash -c "echo -en '\033]0;$2\a'; $1"
}
printf "\e]2;social-deployment\a"
#cd ../social-images
#run "node index" "social-images"
cd ../social-users
run "npm start" "social-users"
cd ../social-pubsubproxy
run "npm start" "social-pubsubproxy"
cd ../social-persistance
run "npm start" "social-persistance"
cd ../social-activities
run "npm start" "social-activities"
cd ../social-voting
run "npm start" "social-voting"
cd ../social-frontend/bff
run "npm start" "social-frontend bff"
cd ../frontend
run "npm run serve" "social-frontend gui"
cd ../../