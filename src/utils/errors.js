export class BrowserError extends Error {
  constructor(classInstance, message, ...params) {
    let className
    if (!message) {
      message = classInstance
      className = 'BrowserError'
    } else if (typeof classInstance === 'object') {
      className = classInstance.constructor.name
    } else if (typeof classInstance === 'string') {
      className = classInstance
    }

    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(`${className}: ${message}`, ...params)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BrowserError)
    }
  }
}
