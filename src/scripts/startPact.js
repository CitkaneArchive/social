const config = require('config');
const { exec } = require('child_process');

const pacts = config.get('pacts');

exec(`docker run -p ${pacts.host}:${pacts.port}:9292 -d -e PACT_BROKER_DATABASE_ADAPTER=sqlite -e PACT_BROKER_DATABASE_NAME=social.sqlite pactfoundation/pact-broker`, {}, (error, stdout, stderr) => {
    if (error) console.log(error);
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
    console.log(`Pact broker docker container started at http://${pacts.host}:${pacts.port}`);
});
