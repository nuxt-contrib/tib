import path from 'path'
import fs from 'fs'
import env from 'node-env-file'
import { createBrowser } from '../../src'
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
      browser = await createBrowser(browserString, {
        folder,
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

      browser.setLogLevel(['warn', 'error', 'info', 'log'])

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

    const url = browser.getUrl(webPath)

    page = await browser.page(url, () => !!window.$vueMeta)

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
    try {
      await page.navigate('/about')
    } catch (e) {}

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
    try {
      await page.navigateByClick('a')
    } catch (e) {}

    expect(await page.routeData()).toEqual({
      path: '/about',
      query: {}
    })

    expect(await page.getTitle()).toBe('About')
  })

  test('Doesnt fail on non-existing elements', async () => {
    await expect(page.getText('.non-existing-element-class')).resolves.toBeNull()
    await expect(page.getTexts('.non-existing-element-class')).resolves.toEqual([])
  })

  test('getText with trim', async () => {
    expect(await page.getText('body', true)).toEqual('Basic About Go to Home Inspect Element to see the meta info')
  })

  test('getTexts with trim', async () => {
    expect(await page.getTexts('div', true)).toEqual(['Basic About Go to Home Inspect Element to see the meta info', 'About Go to Home'])
  })
})
