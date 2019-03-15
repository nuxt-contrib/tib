
// https://www.browserstack.com/automate/node#configure-capabilities
// https://wiki.saucelabs.com/display/DOCS/Platform+Configurator

export const browsers = [
  'chrome',
  'firefox',
  'ie',
  'edge',
  'safari'
]

export const drivers = [
  'puppeteer',
  'selenium'
]

export const providers = [
  'browserstack',
  'saucelabs'
]

export const providerOptions = {
  'local': ['browserstack']
}

export const os = [
  'windows',
  'linux',
  'mac',
  'macos',
  'macosx',
  'osx',
  'android',
  'ios'
]

export const osVersions = {
  windows: [
    'xp',
    '7',
    '8',
    '8.1',
    '10'
  ],
  apple: [
    '10.10',
    '10.11',
    '10.12',
    '10.13',
    '10.14',
    'snowleopard',
    'lion',
    'mountainlion',
    'mavericks',
    'yosemite',
    'elcapitan',
    'sierra',
    'highsierra',
    'mojave'
  ]
}
