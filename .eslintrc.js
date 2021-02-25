module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    'react-native/react-native': true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: ['react', 'react-native', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    'react/prop-types': 'off',
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          [
            '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)'
          ],
          // Packages. `react` related packages come first.
          ['^react', '^@?\\w'],
          // Internal packages.
          ['^(src|@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$']
        ]
      }
    ],
    'simple-import-sort/exports': 'error'
  }
};
