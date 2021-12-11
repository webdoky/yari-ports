module.exports = {
  extends: ['prettier'],
  env: {
    node: true,
    es6: true,
  },
  plugins: ['prettier'],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
  },
};
