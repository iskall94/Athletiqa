
export default {
  // Tells the scanner to search all JS and JSX files inside the src directory
  lexers: {
    js: ['JsxLexer'],
    jsx: ['JsxLexer'],
    default: ['JsxLexer']
  },
  // The locales supported by your application
  locales: ['sv', 'en'],
  // Where the automation output files will be written
  output: 'src/shared/locales/$LOCALE.json',
  input: ['src/**/*.{js,jsx}'],
  lineEnding: 'lf',
  keySeparator: false,
  namespaceSeparator: false
};