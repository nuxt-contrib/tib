import { types, transformFromAstSync } from '@babel/core'
import { parseExpression } from '@babel/parser'
import { BrowserError } from './errors'
import { createCacheKey } from './cache'

const fnCache = {}

export function parseFunction(fn, args, presetOptions) {
  if (arguments.length === 2) {
    presetOptions = args || {}
    args = undefined
  }

  if (typeof fn !== 'function') {
    throw new BrowserError(`parseFunction expects the first argument to be a function, received '${typeof fn}' instead`)
  }

  const fnString = fn.toString()
  const cacheKey = createCacheKey(fnString, presetOptions)

  if (fnCache[cacheKey] && fnCache[cacheKey]) {
    return fnCache[cacheKey]
  }

  const parsed = {}
  let ast = parseExpression(fnString)
  parsed.args = ast.params.map(p => p.name)

  ast = ast.body

  /* transform can only transform a program and a program is an Array of
   * Statements.
   * The body of an arrow function like 'arg => arg' does not
   * contain a Statement, so we add a block & return statement in that case.
   * The return statement is needed later when we create a new Function and the
   * block statement helps so we can (almost) always call slice(1, -1) below to
   * retrieve the real function body
   */
  if (!ast.type.includes('Statement')) {
    ast = types.blockStatement([types.returnStatement(ast)])
  }

  const transpiled = transformFromAstSync(
    types.file(types.program([ast])),
    undefined,
    {
      sourceType: 'script',
      presets: [
        ['@babel/preset-env', presetOptions]
      ]
    }
  )

  if (transpiled.code[0] === '{') {
    // remove block statement needed to transform & trim block whitespace
    parsed.body = transpiled.code.slice(1, -1).trim()
  } else {
    /* istanbul ignore next */
    parsed.body = transpiled.code
  }

  fnCache[cacheKey] = parsed
  return parsed
}
