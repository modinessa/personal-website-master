module.exports = {
  env: {
    browser: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'},
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'warn',
    'func-name': 'off',
    'quotes': ['warn', 'single'],
    'id-length': ['error', { min: 2 }],
		'indent': 'warn',
		'import/extensions': 'off',
		'import/prefer-default-export': 'off',
    'linebreak-style': ['error', 'windows'],
    'max-classes-per-file': ['error', 2],
    'no-use-before-define': ['off', { functions: true, classes: true, variables: false }],
		'no-tabs': 'warn',
		'no-param-reassign': 'off',
    'space-before-blocks': 'warn',
    'no-restricted-modules': ['warn', 'foo-module', 'bar-module'],
		'no-undef': 'warn',
  },
};
