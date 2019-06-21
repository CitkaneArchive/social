/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs-extra');
const path = require('path');
const { fork } = require('child_process');

const rootDir = path.join(__dirname, '../../');

const services = fs.readdirSync(rootDir).filter(dPath => fs.lstatSync(dPath).isDirectory()
    && dPath.startsWith('social-'));

let indexHtml = '';
fs.emptyDirSync(path.join(rootDir, './docs'));
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
            DOC_ROOT: path.join(rootDir, 'docs', 'index.html')
        }
    });
});

fs.writeFileSync(path.join(rootDir, './docs/index.html'), indexHtml);
