import { compile } from 'vue-template-compiler'
import { types, transformFromAstSync } from '@babel/core'
import { parseExpression } from '@babel/parser'
import BrowserError from './error'
import * as constants from './constants'

export function abstractGuard(className, { name } = {}) {
  if (className === name) {
    throw new BrowserError(`Do not use abstract class '${className}' directly`)
  }
}

export function isMockedFunction(fn, fnName) {
  return fn.name !== fnName
}

// TODO: add more test framework checks like sinon?
export function disableTimers() {
  // find Jest fingerprint
  if (process.env.JEST_WORKER_ID) {
    try {
      jest.useFakeTimers()
    } catch (e) {
      /* istanbul ignore next */
      throw new BrowserError(`Enabling fake timers failed: ${e.message}`)
    }
  }
}

export function enableTimers() {
  // find Jest fingerprint
  if (process.env.JEST_WORKER_ID) {
    try {
      // call useFakeTimers first as it seems there is no way to determine
      // if fake timers are used at all and otherwise runOnlyPendingTimers
      // will fail with a warning from within Jest
      // -> Disabled because we probably dont care about pending timers
      // jest.useFakeTimers()
      // jest.runOnlyPendingTimers()
      jest.useRealTimers()
    } catch (e) {
      /* istanbul ignore next */
      throw new BrowserError(`Enabling real timers failed: ${e.message}`)
    }
  }
}

const fnCache = {}
export function parseFunction(fn, presetOptions = {}) {
  if (typeof fn !== 'function') {
    throw new BrowserError(`parseFunction expects the first argument to be a function, received '${typeof fn}' instead`)
  }

  const presetString = JSON.stringify(presetOptions)
  const fnString = fn.toString()
  if (fnCache[fnString] && fnCache[fnString][presetString]) {
    return fnCache[fnString][presetString]
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
   * block statement helps so we can always call slice(1, -1) below to
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

  // remove block statement needed to transform & trim block whitespace
  parsed.body = transpiled.code.slice(1, -1).trim()

  if (!fnCache[fnString]) {
    fnCache[fnString] = {}
  }

  fnCache[fnString][presetString] = parsed

  return parsed
}

export function getDefaultHtmlCompiler() {
  return html => compile(html).ast
}

export function loadDependency(dependency) {
  try {
    return import(dependency).then(m => m.default || m)
  } catch (e) {
    throw new BrowserError(`Could not import the required dependency '${dependency}'
(error: ${e.message})

Please install the dependency with:
$ npm install ${dependency}
or
$ yarn add ${dependency}
    `)
  }
}

export function getBrowserConfigFromString(browserString) {
  const browserConfig = {}

  browserString
    .split('/')
    .filter(s => !!s)
    .map(s => s.toLowerCase()
      // replace first occurence with =
      // -> Chrome 39 => chrome=39
      // -> Mac OS X=High Sierra => Mac OS X=High Sierra
      .replace(/([\s:])/, (m, $1, o, s) => (s.includes('=') ? $1 : '='))
    )
    .forEach((s) => {
      let [ key, value ] = s.split('=', 2) // eslint-disable-line prefer-const
      key = key.replace(/\s+/, '')

      if (constants.browsers.includes(key)) {
        browserConfig.browser = key

        if (value) {
          browserConfig.browserVersion = value.replace(/\s+/g, '')
        }
        return
      }

      if (constants.browserOptions.includes(key)) {
        browserConfig[key] = typeof value === 'undefined' ? true : value
        return
      }

      if (constants.os.includes(key)) {
        browserConfig.os = key

        if (value) {
          browserConfig.osVersion = value
        }
        return
      }

      if (constants.drivers.includes(key)) {
        browserConfig.driver = key
        return
      }

      if (constants.providers.includes(key)) {
        browserConfig.provider = key
        return
      }

      if (constants.browserVariants[key]) {
        browserConfig.browserVariant = key
        return
      }

      if (key === 'device') {
        browserConfig.device = value
        return
      }

      if (!value) {
        const screenResolution = key.split(/(\d+)x(\d+)/i)
        if (screenResolution && screenResolution.length > 1) {
          browserConfig.window = {
            width: parseInt(screenResolution[1]),
            height: parseInt(screenResolution[2])
          }
        }
      }
    })

  return browserConfig
}

export function getBrowserImportFromConfig(browserConfig) {
  const importPath = []

  if (browserConfig.browser) {
    importPath.push(browserConfig.browser)
  }

  if (browserConfig.driver && !browserConfig.provider) {
    importPath.push(browserConfig.driver)
  }

  if (browserConfig.provider) {
    importPath.push(browserConfig.provider)
  }

  if (browserConfig.browserVariant) {
    importPath.push(browserConfig.browserVariant)
  }

  return importPath.join('/')
}
