module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:editorconfig/noconflict',
    'plugin:promise/recommended',
    'plugin:array-func/all',
    'plugin:node/recommended',
    'plugin:unicorn/all',
    'plugin:eslint-comments/recommended',
    'plugin:prettier/recommended',
    'plugin:ava/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['./*'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
        'node/no-extraneous-import': 'off',
        'node/no-unpublished-import': 'off',
        'node/no-unpublished-require': 'off',
        'no-console': 'off',
      },
    },
    {
      files: ['test/**/*'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
        'no-magic-numbers': 'off',
        'node/no-extraneous-import': 'off',
        'node/no-unpublished-import': 'off',
      },
    },
    {
      files: ['lib/kuma/macros/**/*', 'test/src/kuma/macros/**/*'],
      rules: {
        'default-param-last': 'off',
        'unicorn/filename-case': 'off',
        'unicorn/prevent-abbreviations': [
          'error',
          {
            checkFilenames: false,
          },
        ],
      },
    },
  ],
  parserOptions: {
    babelOptions: {
      plugins: ['@babel/plugin-syntax-import-assertions'],
    },
    ecmaVersion: 'latest',
    requireConfigFile: false,
    sourceType: 'module',
  },
  plugins: [
    'prettier',
    'promise',
    'unicorn',
    'array-func',
    'node',
    'eslint-comments',
    'ava',
    'simple-import-sort',
    'editorconfig',
  ],
  root: true,
  rules: {
    'no-param-reassign': ['error', { props: false }],
    // 'consistent-return': 'off',
    // 'arrow-body-style': 0,
    // 'comma-dangle': 0,
    // 'import/prefer-await-to-then': 'off',
    // 'no-underscore-dangle': 'off',
    'unicorn/no-null': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-void': ['error', { allowAsStatement: true }],
    'no-magic-numbers': [
      'warn',
      {
        ignore: [0, 1, -1],
        ignoreDefaultValues: true,
      },
    ],
    'no-console': 'off',
    'unicorn/prefer-spread': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Node.js builtins.
          // eslint-disable-next-line global-require
          [`^(${require('module').builtinModules.join('|')})(/|$)`],
          // Packages.
          ['^@?(\\w|.)[^./]'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'import/order': 'off',
    'no-loss-of-precision': 'warn',
    'promise/no-nesting': 'error',
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/no-unsafe-regex': 'warn',
    'unicorn/prefer-at': 'off',
    'no-var': 'error',
    'prefer-object-has-own': 'error',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'consistent-return': 'warn',
    'no-underscore-dangle': ['error', { allow: ['__compat'] }],
    'unicorn/no-keyword-prefix': 'off',
    camelcase: 'off',
    'no-continue': 'off',
  },
  settings: {
    'import/extensions': ['.mjs', '.js'],
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.js'],
      },
    },
  },
};
