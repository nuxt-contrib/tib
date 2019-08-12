import { navTimeout } from './settings'

export function navigationHelper(performNavigation, timeout = navTimeout) {
  const oldTitle = document.title

  // local firefox has sometimes not updated the title
  // even when the DOM is supposed to be fully updated
  function waitTitleChanged() {
    setTimeout(function () {
      if (oldTitle !== document.title) {
        window.$vueMeta.$emit('titleChanged')
      } else {
        waitTitleChanged()
      }
    }, 50)
  }

  // timeout after 10s
  const cbTimeout = setTimeout(() => {
    // eslint-disable-next-line no-console
    console.error(`browser: navigation timed out after ${Math.round(timeout / 1000)}s`)
    window.$vueMeta.$emit('titleChanged')
  }, timeout)

  return new Promise((resolve) => {
    window.$vueMeta.$once('routeChanged', waitTitleChanged)
    window.$vueMeta.$once('titleChanged', () => {
      clearTimeout(cbTimeout)
      resolve()
    })

    performNavigation()
  })
}
