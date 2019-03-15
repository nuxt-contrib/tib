import basicTests from './basic'

const browsers = [
  'firefox',
  'chrome',
  'chrome/browserstack/local'
]

browsers.forEach(browser => basicTests(browser))
