module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'airbnb/hooks', 'plugin:react/recommended', 'plugin:react/jsx-runtime'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'comma-dangle': 0,
    'react/jsx-filename-extension': [1, { allow: 'always' }],
    'no-use-before-define': 'off',
    'no-alert': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    camelcase: 'off',
    'no-unused-vars': 0,
  },
};
