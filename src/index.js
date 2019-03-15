import Browser from './browser'
import * as commands from './utils/commands'

export async function browser(str, conf, autoStart = true) {
  if (!autoStart) {
    return Browser.get(str, conf)
  }

  const instance = await Browser.get(str, conf)
  return instance.start()
}

export {
  commands
}
