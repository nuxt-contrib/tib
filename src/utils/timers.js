import { BrowserError } from './errors'

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
