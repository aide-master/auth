module.exports = {
  extends: ['standard-with-typescript', 'standard-react'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks'],
  parserOptions: {
    project: './tsconfig.json'
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off'
      }
    }
  ],
  settings: {
    react: {
      version: '999.999.999'
    }
  }
}
