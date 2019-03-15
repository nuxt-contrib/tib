import path from 'path'
import { promisify } from 'util'
import Glob from 'glob'

const glob = promisify(Glob)

// default (required) config for browser stack local

function capatilize(name) {
  name = name.replace(/browserstack/i, 'BrowserStack')
  name = name.replace(/^ie/i, 'IE')
  return name.replace(/(^|\/)([a-z])/gi, (m, $1, $2) => $2.toUpperCase())
}

/* eslint-disable no-unused-vars */

const browsers = {
  'puppeteer/webpage': async (name) => {
    const browser = await standardWebpageTest(name)
  },
  'selenium/webpage': async (name) => {
    const browser = await standardWebpageTest(name)
  }
}

async function standardWebpageTest(name, expectedConstructor) {
  if (!expectedConstructor) {
    expectedConstructor = capatilize(name)
  }

  const test = import(path.resolve(__dirname, '../../src/', name))
    .then(m => m.default || m)
    .then(Webpage => new Webpage())

  await expect(test).rejects.toThrow(expectedConstructor)
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
