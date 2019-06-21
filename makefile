start-pact:
	src/scripts/startPact.sh

start-all-local:
	src/scripts/startalllocal.sh

jsdocs:
	node src/scripts/makeDocs

update-configs:
	git submodule foreach './updateConfig.sh'