import path from 'path'
import { promisify } from 'util'
import Glob from 'glob'

const glob = promisify(Glob)

function capatilize(name) {
  return name
    .replace(/browserstack/i, 'BrowserStack')
    .replace(/^ie/i, 'IE')
    .replace(/(^|\/)([a-z])/gi, (m, $1, $2) => $2.toUpperCase())
}

const browsers = {
  'puppeteer/webpage': name => standardWebpageTest(name),
  'selenium/webpage': name => standardWebpageTest(name)
}

async function standardWebpageTest(name, expectedConstructor) {
  if (!expectedConstructor) {
    expectedConstructor = capatilize(name)
  }

  const webpageImportPath = path.resolve(__dirname, '../../src/', name)
  const browserImportPath = path.dirname(webpageImportPath)

  const browser = await import(browserImportPath)
    .then(m => m.default || m)
    .then(Browser => new Browser())

  const Webpage = await import(webpageImportPath).then(m => m.default || m)

  // throws error when started without browser arg
  expect(() => new Webpage()).toThrow(expectedConstructor)

  // throws error when browser not started
  expect(() => new Webpage(browser)).toThrow(expectedConstructor)

  return [browser, Webpage]
}

describe('webpage', () => {
  test('all files covered', async () => {
    const srcPath = path.resolve(__dirname, '../../src/') + '/'
    let files = await glob(`${srcPath}!(utils)/**/*.js`)
    files = files
      .filter(f => f.includes('webpage'))
      .map(f => f
        .replace(srcPath, '')
        .replace('.js', '')
      )
      .sort()

    expect(Object.keys(browsers).sort()).toEqual(files)
  })

  for (const name in browsers) {
    const tests = browsers[name]

    test(name, async () => {
      expect.hasAssertions()

      await tests(name)
    })
  }
})
