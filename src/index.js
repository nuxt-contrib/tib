import Browser from './browsers/browser'
import * as commands from './commands'
import { createPageFunctions } from './utils'

export async function createBrowser(str, conf, autoStart = true) {
  const instance = Browser.get(str, conf)
  if (!autoStart) {
    return instance
  }

  return (await instance).start()
}

export function browser(...args) {
  /* istanbul ignore next */
  console.warn('DeprecationWarning: \'browser\' has been renamed to \'createBrowser\'') // eslint-disable-line no-console
  /* istanbul ignore next */
  return createBrowser(...args)
}

export {
  commands,
  createPageFunctions
}
