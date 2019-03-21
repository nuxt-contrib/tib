import Browser from './browser'
import * as commands from './utils/commands'

export async function browser(str, conf, autoStart = true) {
  const instance = Browser.get(str, conf)
  if (!autoStart) {
    return instance
  }

  return (await instance).start()
}

export {
  commands
}
