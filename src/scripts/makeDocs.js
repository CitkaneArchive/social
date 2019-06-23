/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs-extra');
const path = require('path');
const { fork } = require('child_process');

const rootDir = path.join(__dirname, '../../');


const services = fs.readdirSync(rootDir).filter(dPath => fs.lstatSync(dPath).isDirectory()
    && dPath.startsWith('social-'));

let indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>   
    <meta charset="utf-8">
    <title>Home - Documentation</title>
    <link type="text/css" rel="stylesheet" href="styles/jsdoc.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            padding-top:12px;
        }
        menu {
            padding: 0;
            display:flex;
            justify-content:space-between;
            align-items:center;
        }
        .content {
            max-width:650px;
        }
    </style>
</head>
<body>
<h4>Documentation: </h4>
<menu>
`;
fs.emptyDirSync(path.join(rootDir, './docs'));
fs.copySync(path.join(rootDir, 'node_modules/docdash/static/styles'), path.join(rootDir, './docs/styles'));
services.forEach((service) => {
    const serviceDir = path.join(rootDir, service);
    const { version } = require(path.join(serviceDir, 'package.json'));
    indexHtml += `

    <a href="@social/${service.split('-')[1]}/${version}/index.html">${service}</a>
    `;
    fork('node_modules/.bin/jsdoc', [
        '-r',
        '-t',
        './node_modules/docdash',
        '-c',
        './src/jsdocConfig.js',
        '-d',
        './docs'
    ], {
        cwd: rootDir,
        env: {
            ROOT_DIR: serviceDir,
            DOC_ROOT: '/docs'
        }
    });
});
indexHtml += `
</menu>
<h1>Social microservice framework</h1>
    <div class="content">
        <p>
        "SOCIAL" is an application that provides content management for voting on events and suggestions.
        It is intrinsically simple, trying to do one thing well, ie. allow users to add suggestions and then moderating group voting on these.
        </p>
        <p>
        Underlying this is the purpose to provide a non production-critical environment as an incubator for developers to explore and research microservice idioms. 
        </p>
    </div>
    <h2>Testing</h2>
    <div class="content">
        <p>"SOCIAL" follows a "Consumer Driven Contract" testing pattern, using the <a href="https://docs.pact.io/" target="_blank">Pact</a> framework.<p>
        <p>Consumer services publish their expectation tests to a central broker, and providers run their tests against these expectations</p>
        <p>The broker can be accessed via the link in the main menu.</p>
    </div>
    <h2>Messaging</h2>
    <div class="content">
        <p>"SOCIAL" provides a common internal API across all services with pub/sub, req/res and push/pull patterns<p>
        <p>This is implemented using <a href="http://zeromq.org/" target="_blank">ØMQ</a>, a distributed messaging solution.</p>
    </div>
</body>
</html>
`;
fs.writeFileSync(path.join(rootDir, './docs/index.html'), indexHtml);
