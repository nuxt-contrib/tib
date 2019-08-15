import path from 'path'
import { md5sum } from './hash'
import { findNodeModulesPath } from './package'

export function createCacheKey(fn, opts) {
  if (typeof opts !== 'string') {
    opts = JSON.stringify(opts)
  }

  return md5sum(`${fn}-x-${opts}`)
}

export async function getCachePath(filePath = '') {
  const modulesPath = await findNodeModulesPath()
  return path.join(modulesPath, '.cache', 'tib', filePath)
}
