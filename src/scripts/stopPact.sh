#!/bin/bash

docker stop $(docker ps -a -q --filter ancestor=pactfoundation/pact-broker --format="{{.ID}}")