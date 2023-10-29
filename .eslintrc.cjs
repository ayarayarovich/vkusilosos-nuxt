module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'prettier'],
  plugins: [],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/require-toggle-inside-transition': 'warn',
  },
}
