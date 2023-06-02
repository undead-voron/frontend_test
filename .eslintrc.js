module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier-vue/recommended', 'prettier'],
  plugins: ['@typescript-eslint', 'prettier', 'eslint-plugin-import'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: 'tsconfig.json',
    tsconfigRootDir: './',
    extraFileExtensions: ['.vue']
  },
  rules: {
    'import/order': ['error', {
      "pathGroups": [{
        "pattern": "~/**",
        "group": "internal"
      }],
      'groups': ['builtin', 'external', 'internal', 'parent', 'index', 'sibling', 'type'],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: false
      }
    }],
    'import/newline-after-import': 'error',
    'no-console': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'only-multiline'],
    'vue/multi-word-component-names': 0,
    'vue/no-deprecated-dollar-scopedslots-api': 0,
    'vue/require-default-prop': 0,
    'space-before-function-paren': ['error', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'prettier/prettier': ['error', {
      tabWidth: 2,
      singleQuote: true,
      printWidth: 120
    }],
    'prettier-vue/prettier': ['error', {
      singleQuote: true,
      htmlWhitespaceSensitivity: 'ignore',
      printWidth: 120
    }],
    'vue/no-multiple-template-root': 'off' // https://v3-migration.vuejs.org/new/fragments.html
  },
  "overrides": [
    {
      // enable the rule specifically for TypeScript files
      "files": ["*.ts", "*.mts", "*.cts", "*.tsx"],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": "error"
      }
    }
  ]
};
