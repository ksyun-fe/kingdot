module.exports = {
    extends: ['@commitlint/config-angular'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'docs',
                'style',
                'build',
                'refactor',
                'revert',
                'test',
                'perf',
                'chore'
            ]
        ]
    }
};
