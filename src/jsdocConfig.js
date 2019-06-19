module.exports = {
    plugins: ['plugins/markdown'],
    recurseDepth: 10,
    source: {
        exclude: [],
        includePattern: '.+\\.js(doc|x)?$',
        excludePattern: '(^|\\/|\\\\)_'
    },
    template: 'node_modules/docdash'
};
