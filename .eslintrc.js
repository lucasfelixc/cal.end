// Workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    extends: [
        'plugin:@croct/react',
        'plugin:@croct/typescript',
        'next/core-web-vitals',
    ],
    plugins: ['@croct'],
    parserOptions: {
        project: [
            './tsconfig.json',
        ],
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        'no-restricted-syntax': [
            'error',
            'ForInStatement',
            'LabeledStatement',
            'WithStatement',
        ],
        '@typescript-eslint/no-use-before-define': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
        jest: {
            version: 'detect',
        },
    },
    overrides: [
        {
            files: ['**/*.{tsx,ts}'],
            rules: {
                'react/display-name': 'off',
                'no-void': 'off',
            },
        },
        {
            files: [
                'src/pages/**/*.{tsx,ts}',
                'src/app/**/*.{tsx,ts}',
            ],
            rules: {
                'import/no-default-export': 'off',
            },
        },
        {
            files: [
                '*.test.{ts,tsx}',
            ],
            rules: {
                '@next/next/no-img-element': 'off',
            },
        },
        // @todo: edit logic of these rules
        {
            files: [
                'src/tests/e2e/**/*.test.{ts,tsx}',
            ],
            rules: {
                'testing-library/prefer-screen-queries': 'off',
                'lintjest/no-standalone-expect': 'off',
                'jest/no-standalone-expect': 'off',
            },
        },
    ],
};
