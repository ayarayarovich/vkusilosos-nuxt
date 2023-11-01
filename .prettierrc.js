/** @type {import("prettier").Config} */
const config = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  printWidth: 120,
  quoteProps: 'consistent',
  singleAttributePerLine: true,
  plugins: ['prettier-plugin-tailwindcss'],
}

export default config
