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
		'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'class-methods-use-this': 'off',
		'consistent-return': 'warn',
    'func-name': 'off',
    'quotes': ['warn', 'single'],
		'id-length': ['error', {'min': 3}],
    'max-classes-per-file': ['error', 2],
    'no-use-before-define': ['error', { 'functions': true, 'classes': true, 'variables': false }],
		'space-before-blocks': "warn",
  },
};
