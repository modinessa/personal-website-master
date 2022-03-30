module.exports = {
  env: {
    browser: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    es2021: true,
  },
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'class-methods-use-this': 'off',
    'consistent-return': 'warn',
    'func-name': 'off',
    'quotes': ['warn', 'single'],
    'id-length': ['error', { min: 3 }],
    'linebreak-style': ['error', 'unix'],
    'max-classes-per-file': ['error', 2],
    'no-use-before-define': ['error', { functions: true, classes: true, variables: false }],
		'parser': '@babel/eslint-parser',
    'space-before-blocks': 'warn',
    'no-restricted-modules': ['warn', 'foo-module', 'bar-module'],
  },
};
