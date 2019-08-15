import { navTimeout } from './settings'
import { navigationHelper } from './navigationHelper'

export default function navigateByClick(selector, timeout = navTimeout) {
  return navigationHelper(() => {
    document.querySelector(selector).click()
  }, timeout)
}
