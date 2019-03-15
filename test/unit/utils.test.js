import * as utils from '../../src/utils'

describe('utils', () => {
  test('browser strings', () => {
    const browserStrings = [
      'chrome',
      'chrome/windows',
      'chrome/windows 8.1',
      'chrome/windows=8',
      'chrome/windows:7',
      'macos high sierra',
      'mac os=high sierra',
      'firefox',
      'puppeteer/linux',
      'selenium',
      '/windows 7/chrome 39/browserstack/local/1280x1024',
      'android 8/device=Android Emulator'
    ]

    browserStrings.forEach((s) => {
      /*
       * !!! check the snapshot carefully before updating !!!
       */
      // console.log(utils.getBrowserConfigFromString(s))
      expect(utils.getBrowserConfigFromString(s)).toMatchSnapshot()
    })
  })
})
