const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');

const rootDir = path.join(__dirname, '../');

const services = fs.readdirSync(rootDir).filter(dPath => fs.lstatSync(dPath).isDirectory()
    && dPath.startsWith('social-'));

let indexHtml = '';
services.forEach((service) => {
    indexHtml += `
<a href="${service}/index.html">${service}</a>
    `;
    fs.emptyDirSync(path.join(rootDir, './docs', service));
    spawn('node', [
        './node_modules/.bin/jsdoc',
        '-r',
        '-t',
        `${rootDir}/node_modules/docdash`,
        '-c',
        './src/jsdocConfig.js',
        '-d',
        `./docs/${service}`,
        `${rootDir}/${service}/src`
    ], {
        cwd: rootDir
    });
});

fs.writeFileSync(path.join(rootDir, './docs/index.html'), indexHtml);
