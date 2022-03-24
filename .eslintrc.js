module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'max-classes-per-file': ['error', 2],
    'no-use-before-define': ['error', { functions: true, classes: true, variables: false }],
    'arrow-parens': ['error', 'as-needed'],
    'class-methods-use-this': 'off',
    'func-name': 'off',
  },
};
