// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['node_modules/', 'dist/', '*.config.js', 'coverage/']
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'block-spacing': ['error', 'always'],
      'brace-style': ['error', '1tbs'],
      'camelcase': ['error', { 'properties': 'never' }],
      'comma-dangle': ['error', 'never'],
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'comma-style': ['error', 'last'],
      'curly': ['error', 'all'],
      'dot-location': ['error', 'property'],
      'eol-last': ['error', 'always'],
      'eqeqeq': ['error', 'allow-null'],
      'func-call-spacing': ['error', 'never'],
      'indent': ['error', 2],
      'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      'new-cap': ['error', { 'newIsCap': true, 'capIsNew': false }],
      'new-parens': 'error',
      'no-console': 'warn',
      'no-ex-assign': 'error',
      'no-floating-decimal': 'error',
      'no-func-assign': 'error',
      'no-implied-eval': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }],
      'no-tabs': 'error',
      'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
      'no-template-curly-in-string': 'error',
      'no-this-before-super': 'error',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-whitespace-before-property': 'error',
      'max-len': ['error', { 'code': 100 }],
      'operator-linebreak': ['error', 'before'],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'semi': ['error', 'always'],
      'semi-spacing': 'error'
    }
  },
  {
    files: ['**/*.{ts,cts,mts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        projectService: true
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic
    ],
    rules: {
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'block-spacing': ['error', 'always'],
      'brace-style': ['error', '1tbs'],
      'camelcase': ['error', { 'properties': 'never' }],
      'comma-dangle': ['error', 'never'],
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'comma-style': ['error', 'last'],
      'curly': ['error', 'all'],
      'dot-location': ['error', 'property'],
      'eol-last': ['error', 'always'],
      'eqeqeq': ['error', 'allow-null'],
      'func-call-spacing': ['error', 'never'],
      'indent': ['error', 2],
      'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      'new-cap': ['error', { 'newIsCap': true, 'capIsNew': false }],
      'new-parens': 'error',
      'no-console': 'warn',
      'no-ex-assign': 'error',
      'no-floating-decimal': 'error',
      'no-func-assign': 'error',
      'no-implied-eval': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }],
      'no-tabs': 'error',
      'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
      'no-template-curly-in-string': 'error',
      'no-this-before-super': 'error',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-whitespace-before-property': 'error',
      'max-len': ['error', { 'code': 100 }],
      'operator-linebreak': ['error', 'before'],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'semi': ['error', 'always'],
      'semi-spacing': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }]
    }
  }
);
