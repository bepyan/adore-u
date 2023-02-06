module.exports = {
  extends: ['next/core-web-vitals', '@antfu', 'plugin:tailwindcss/recommended'],
  plugins: ['unused-imports', 'simple-import-sort'],
  parser: '@typescript-eslint/parser',
  settings: {
    tailwindcss: {
      callees: ['cn'],
    },
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [['^\\u0000'], ['^@?\\w'], ['^~/'], ['^\\.']],
      },
    ],
    'import/order': 'off',
  },
}
