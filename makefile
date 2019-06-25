pact-start:
	node src/scripts/startPact.js

pact-stop:
	src/scripts/stopPact.sh

start-all-local:
	src/scripts/startalllocal.sh

jsdocs:
	node src/scripts/makeDocs

update-configs:
	git submodule foreach './updateConfig.sh'