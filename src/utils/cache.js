import path from 'path'
import { md5sum, findNodeModulesPath, getPackageName } from '.'

export function createCacheKey(fn, opts) {
  if (typeof opts !== 'string') {
    opts = JSON.stringify(opts)
  }

  return md5sum(`${fn}-x-${opts}`)
}

export async function getCacheEntry(filePath = '') {
  const modulesPath = await findNodeModulesPath()
  const name = await getPackageName(modulesPath)

  return path.join(modulesPath, '.cache', name, filePath)
}
