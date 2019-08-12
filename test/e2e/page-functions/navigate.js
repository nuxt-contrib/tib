import { navTimeout } from './settings'
import { navigationHelper } from './navigationHelper'

export default function navigate(path, timeout = navTimeout) {
  return navigationHelper(() => {
    window.$vueMeta.$router.push(path)
  }, timeout)
}
