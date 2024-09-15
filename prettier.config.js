const styleguide = require('@vercel/style-guide/prettier');

module.exports = {
  ...styleguide,
  plugins: [
    ...styleguide.plugins,
    'prettier-plugin-tailwindcss'
  ],
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx', '*.json'],
      options: {
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'always',
        semi: true,
        newline: 'lf',
        endOfLine: 'auto',
        insertFinalNewline: true,
      }
    },
  ]
};