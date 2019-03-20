import parseFn from 'parse-function'
import { compile } from 'vue-template-compiler'
import BrowserError from './error'
import * as constants from './constants'

export function abstractGuard(className, { name } = {}) {
  if (className === name) {
    throw new BrowserError(`Do not use abstract class '${className}' directly`)
  }
}

// TODO: add more test framework checks like sinon?
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

/* Not used at the moment
export function findNodeByType(node, type) {
  if (Array.isArray(node.body)) {
    for (const k in node.body) {
      if (findNodeByType(node.body[k], type)) {
        return true
      }
    }
  } else if (node.body) {
    return findNodeByType(node.body, type)
  } else if (node.type === type) {
    return true
  }
  return false
}
/**/

let fnParser
export function parseFunction(fn, needsReturn) {
  if (typeof fn !== 'function') {
    throw new BrowserError(`parseFunction expects the first argument to be a function, received '${typeof fn}' instead`)
  }

  if (!fnParser) {
    fnParser = parseFn()
    fnParser.use((self) => {
      return (node, result) => {
        if (fnParser.needsReturn && node.type === 'ArrowFunctionExpression' && node.body.type !== 'ReturnStatement' && node.body.type !== 'BlockStatement') {
          self.define(result, 'body', `return ${result.body}`)
        }
      }
    })
  }

  fnParser.needsReturn = needsReturn

  return fnParser.parse(fn)
}

export function getDefaultHtmlCompiler() {
  return html => compile(html).ast
}

export async function loadDependency(dependency) {
  try {
    return await import(dependency).then(m => m.default || m)
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
