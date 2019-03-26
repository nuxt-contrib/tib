import Browser from './browser'
import * as commands from './utils/commands'

export async function createBrowser(str, conf, autoStart = true) {
  const instance = Browser.get(str, conf)
  if (!autoStart) {
    return instance
  }

  return (await instance).start()
}

export function browser(...args) {
  console.warn(`DeprecationWarning: 'browser' has been renamed to 'createBrowser'`)
  return createBrowser(...args)
}

export {
  commands
}
