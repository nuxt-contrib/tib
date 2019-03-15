import path from 'path'
import fs from 'fs'
import env from 'node-env-file'
import { browser as startBrowser } from '../..'

const tests = (browserString) => {
  browserString = process.env.BROWSER_STRING || browserString || 'puppeteer'

  describe(browserString, () => {
    let browser
    const folder = path.resolve(__dirname, '..', 'fixtures/basic')

    beforeAll(async () => {
      if (browserString.includes('browserstack') && browserString.includes('local')) {
        const envFile = path.resolve(__dirname, '../..', 'browserstack.env')
        if (fs.existsSync(envFile)) {
          env(envFile)
        }
      }

      browser = await startBrowser(browserString, {
        xvfb: true,
        BrowserStackLocal: { folder },
        extendPage(page) {
          return {
            async navigate(path) {
              // IMPORTANT: use (arrow) function with block'ed body
              // see: https://github.com/tunnckoCoreLabs/parse-function/issues/179
              await page.runAsyncScript((path) => {
                return new Promise((resolve) => {
                  const oldTitle = document.title

                  // local firefox has sometimes not updated the title
                  // even when the DOM is supposed to be fully updated
                  const waitTitleChanged = function () {
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
            routeData() {
              return page.runScript(() => ({
                path: window.$vueMeta.$route.path,
                query: window.$vueMeta.$route.query
              }))
            }
          }
        }
      })
    })

    afterAll(async () => {
      if (browser) {
        await browser.close()
      }
    })

    test('page tests', async function () {
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

      const page = await browser.page(url)

      const html = await page.getHtml()
      expect(html).toBeDefined()
      expect(html).toContain('<html')
      expect(html).toContain('</html>')

      const div = await page.getElement('div')
      expect(div.attrsMap).toEqual({ id: 'app' })
      expect(div.children.length).toBe(5)

      const divs = await page.getElements('div')
      expect(divs[0].attrsMap).toEqual({ id: 'app' })
      expect(divs[1].attrsMap).toEqual({})
      expect(divs[1].children.length).toBe(3)

      expect(await page.getAttribute('div', 'id')).toBe('app')
      expect(await page.getAttributes('div', 'id')).toEqual(['app', null])

      expect(await page.getText('h1')).toBe('Basic')
      expect(await page.getTexts('h1, h2')).toEqual(['Basic', 'Home'])

      expect(await page.getElementCount('meta')).toBe(2)
      expect(await page.getTitle()).toBe('Home | Vue Meta Test')

      await page.navigate('/about')

      expect(await page.routeData()).toEqual({
        path: '/about',
        query: {}
      })

      expect(await page.getTitle()).toBe('About')
    })
  })
}

export default tests
