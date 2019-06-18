module.exports = {
    plugins: ['plugins/markdown'],
    source: {
        include: [
            './social-activities/src/activities.js',
            './social-persistance/src/persistance.js'
        ],
        exclude: [],
        includePattern: '.+\\.js(doc|x)?$',
        excludePattern: '(^|\\/|\\\\)_'
    }
};
