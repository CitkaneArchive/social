#!/bin/bash

docker run -p 80:80 -d -e PACT_BROKER_DATABASE_ADAPTER=sqlite -e PACT_BROKER_DATABASE_NAME=social.sqlite dius/pact-broker
echo Pact broker docker container started at http://localhost