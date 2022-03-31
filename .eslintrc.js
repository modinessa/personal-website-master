module.exports = {
  env: {
    browser: true,
  },
  //parser: "@babel/eslint-parser",
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'},
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'class-methods-use-this': 'off',
    'consistent-return': 'warn',
    'func-name': 'off',
    'quotes': ['warn', 'single'],
    'id-length': ['error', { min: 3 }],
    'linebreak-style': ['error', 'windows'],
    'max-classes-per-file': ['error', 2],
    'no-use-before-define': ['warn', { functions: true, classes: true, variables: false }],
		'no-param-reassign': 'warn',
    'space-before-blocks': 'warn',
    'no-restricted-modules': ['warn', 'foo-module', 'bar-module'],
  },
};
