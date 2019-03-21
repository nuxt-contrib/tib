import path from 'path'
import fs from 'fs'
import env from 'node-env-file'
import { browser as startBrowser } from '../../src'
import { waitFor } from '../utils'

const browserString = process.env.BROWSER_STRING || 'puppeteer/core'

describe(browserString, () => {
  let browser
  let page
  const folder = path.resolve(__dirname, '..', 'fixtures/basic')

  beforeAll(async () => {
    if (browserString.includes('browserstack') && browserString.includes('local')) {
      const envFile = path.resolve(__dirname, '..', '..', '.env-browserstack')
      if (fs.existsSync(envFile)) {
        env(envFile)
      }
    }

    try {
      browser = await startBrowser(browserString, {
        BrowserStackLocal: { folder },
        extendPage(page) {
          return {
            async navigate(path) {
              await page.runAsyncScript((path) => {
                return new Promise((resolve) => {
                  const oldTitle = document.title

                  // local firefox has sometimes not updated the title
                  // even when the DOM is supposed to be fully updated
                  function waitTitleChanged() {
                    setTimeout(function () {
                      if (oldTitle !== document.title) {
                        resolve()
                      } else {
                        waitTitleChanged()
                      }
                    }, 50)
                  }

                  window.$vueMeta.$once('routeChanged', waitTitleChanged)
                  window.$vueMeta.$router.push(path)
                })
              }, path)
            },
            async navigateByClick(selector) {
              // listener for nav change
              await page.runAsyncScript(selector => new Promise((resolve) => {
                const oldTitle = document.title

                function waitTitleChanged() {
                  setTimeout(function () {
                    if (oldTitle !== document.title) {
                      resolve()
                    } else {
                      waitTitleChanged()
                    }
                  }, 250)
                }

                window.$vueMeta.$once('routeChanged', waitTitleChanged)

                document.querySelector(selector).click()
              }), selector)
            },
            routeData() {
              return page.runScript(() => ({
                path: window.$vueMeta.$route.path,
                query: window.$vueMeta.$route.query
              }))
            }
          }
        }
      }, false)

      // attempts to get some logging from Firefox (NOTHING WORKS FOR ME ATM)
      if (browserString.includes('firefox')) {
        /* browser.hook('selenium:build:before', (builder) => {
          const service = new browser.constructor.client.ServiceBuilder()
          service.enableVerboseLogging(true)
          builder.setFirefoxService(service)
        })

        browser.hook('selenium:build:options', (options, builder, browserInstance) => {
          options.setPreference('marionette.logging', 'TRACE')
          options.setPreference('devtools.console.stdout.content', true)
        })/**/

        /*
        browser.hook('start:after', async (driver) => {
          await driver.installAddon(path.join(__dirname, '../utils/webconsoletap-1.0-fx.xpi'))
        })

        browser.hook('webpage:property', async (property) => {
          if (!property.startsWith('get')) {
            // dont run this on page fn's called in this hook itself
            return
          }

          const consoleLogs = await page.runAsyncScript(() => {
            window.console.requestDump()

            var consoleLogs
            function dumpTimeout(fn) {
              setTimeout(() => {
                consoleLogs = window.console.getDump()
                if (consoleLogs === null) {
                  dumpTimeout(fn)
                } else {
                  fn(consoleLogs)
                }
              }, 50)
            }
            return new Promise(resolve => dumpTimeout(resolve))
          })
        })
        */
      }

      await browser.start()
    } catch (e) {
      console.error(e) // eslint-disable-line no-console
    }

    /* TODO: check why Jest doesnt bail when browser fails to start
     * - https://github.com/facebook/jest/issues/6695
     */
    expect(browser).toBeDefined()
    expect(browser.isReady()).toBe(true)
  })

  afterAll(async () => {
    if (browser) {
      await browser.close()
    }
  })

  test('load page', async function () {
    // this should prevent the test to succeed if the browser failed to start
    expect.hasAssertions()

    if (!browser) {
      return
    }

    const webPath = '/index.html'

    let url
    if (browser.getLocalFolderUrl) {
      url = browser.getLocalFolderUrl(webPath)
    } else {
      url = `file://${path.join(folder, webPath)}`
    }

    page = await browser.page(url)

    const html = await page.getHtml()
    expect(html).toBeDefined()
    expect(html).toContain('<html')
    expect(html).toContain('</html>')
  })

  test('getElement', async () => {
    const div = await page.getElement('div')
    expect(div.attrsMap).toEqual({ id: 'app' })
    expect(div.children.length).toBe(5)
  })

  test('getElements', async () => {
    const divs = await page.getElements('div')
    expect(divs[0].attrsMap).toEqual({ id: 'app' })
    expect(divs[1].attrsMap).toEqual({})
    expect(divs[1].children.length).toBe(3)
  })

  test('getAttribute', async () => {
    expect(await page.getAttribute('div', 'id')).toBe('app')
  })

  test('getAttributes', async () => {
    expect(await page.getAttributes('div', 'id')).toEqual(['app', null])
  })

  test('getText', async () => {
    expect(await page.getText('h1')).toBe('Basic')
  })

  test('getTexts', async () => {
    expect(await page.getTexts('h1, h2')).toEqual(['Basic', 'Home'])
  })

  test('getElementCount', async () => {
    expect(await page.getElementCount('meta')).toBe(2)
  })

  test('getTitle', async () => {
    expect(await page.getTitle()).toBe('Home | Vue Meta Test')
  })

  test('run(Async)Script', async () => {
    await page.navigate('/about')

    expect(await page.routeData()).toEqual({
      path: '/about',
      query: {}
    })

    expect(await page.getTitle()).toBe('About')
  })

  test('clickElement', async () => {
    await page.clickElement('a')

    await waitFor(1000)

    expect(await page.routeData()).toEqual({
      path: '/',
      query: {}
    })

    expect(await page.getTitle()).toBe('Home | Vue Meta Test')
  })

  test('click', async () => {
    await page.navigateByClick('a')

    expect(await page.routeData()).toEqual({
      path: '/about',
      query: {}
    })

    expect(await page.getTitle()).toBe('About')
  })
})
