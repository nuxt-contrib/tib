import { BrowserError } from './errors'

export * from './browser'
export * from './compiler'
export * from './errors'
export * from './fs'
export * from './page-functions'
export * from './parser'
export * from './timers'

export const camelCase = str => str.replace(/(^|[-_.\s]+)(.)/g, (m, $1, $2, offset) => !offset ? $2.toLowerCase() : $2.toUpperCase())

export function abstractGuard(className, { name } = {}) {
  if (className === name) {
    throw new BrowserError(`Do not use abstract class '${className}' directly`)
  }
}

export function isMockedFunction(fn, fnName) {
  return fn.name !== fnName
}

export async function loadDependency(dependency) {
  try {
    const module = await import(dependency).then(m => m.default || m)
    return module
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

export const waitFor = time => new Promise(resolve => setTimeout(resolve, time || 1000))
