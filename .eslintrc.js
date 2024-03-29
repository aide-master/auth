module.exports = {
  extends: ['standard-with-typescript', 'standard-react'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks'],
  parserOptions: {
    project: './tsconfig.json',
    "warnOnUnsupportedTypeScriptVersion": false
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react/prop-types': 'off',
        "@typescript-eslint/promise-function-async": [
          "error",
          {
            "allowAny": true
          }
        ]
      }
    }
  ],
  settings: {
    react: {
      version: '999.999.999'
    }
  }
}
