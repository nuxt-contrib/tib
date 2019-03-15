module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    'jest/globals': true
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: [
    'standard',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: [
    'jest'
  ],
  rules: {
    // Enforce import order
    'import/order': 2,

    // Imports should come first
    'import/first': 2,

    // Other import rules
    'import/no-mutable-exports': 2,

    // Allow unresolved imports
    'import/no-unresolved': 0,

    // Allow paren-less arrow functions only when there's no braces
    'arrow-parens': [2, 'as-needed', { requireForBlockBody: true }],

    // Allow async-await
    'generator-star-spacing': 0,

    // Allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 1,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 1,

    // Prefer const over let
    'prefer-const': [2, {
      'destructuring': 'any',
      'ignoreReadBeforeAssign': false
    }],

    // No single if in an else block
    'no-lonely-if': 2,

    // Force curly braces for control flow,
    // including if blocks with a single statement
    curly: [2, 'all'],

    // No async function without await
    'require-await': 2,

    // Force dot notation when possible
    'dot-notation': 2,

    'no-var': 2,

    // Force object shorthand where possible
    'object-shorthand': 2,

    // No useless destructuring/importing/exporting renames
    'no-useless-rename': 2,

    'space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
    }],
  }
}
