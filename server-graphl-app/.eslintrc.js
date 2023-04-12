module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  plugins: ['graphql', 'jest'],
  env: {
    node: true,
    'jest/globals': true,
  },
  ignorePatterns: ['types.d.ts'],
};
