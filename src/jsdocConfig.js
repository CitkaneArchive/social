const rootDir = process.env.ROOT_DIR;
const docRoot = process.env.DOC_ROOT;
const path = require('path');

module.exports = {
    plugins: ['plugins/markdown'],
    recurseDepth: 10,
    source: {
        include: [
            rootDir,
            path.join(rootDir, 'README.md'),
            path.join(rootDir, 'package.json')
        ],
        includePattern: '.+\\.js(doc|x)?$',
        excludePattern: '(node_modules|docs)'
    },
    template: 'node_modules/docdash',
    docdash: {
        sort: true,
        sectionOrder: [
            'Tutorials',
            'Modules',
            'Namespaces',
            'Events',
            'Classes',
            'Externals',
            'Mixins',
            'Interfaces'
        ],
        collapse: true,
        typedefs: true,
        removeQuotes: 'all',
        menu: {
            'Project Home': {
                href: docRoot
            }
        }
    }
};
