import path from 'path'
import { exists, requireResolve } from './fs'

let packageName
let nodeModulesPath

export async function getPackageName(modulesPath) {
  if (!packageName) {
    const { name } = await import(path.resolve(modulesPath, '..', 'package.json'))
    packageName = name
  }

  return packageName
}

export async function checkNodeModulesPath(modulesPath) {
  const pathExists = await exists(modulesPath)

  if (pathExists) {
    nodeModulesPath = modulesPath
    return true
  }

  return false
}

export async function findNodeModulesPath(refresh) {
  if (nodeModulesPath && !refresh) {
    return nodeModulesPath
  }

  let modulesPath = path.resolve(__dirname, '../../..', 'node_modules')
  if (await checkNodeModulesPath(modulesPath)) {
    return nodeModulesPath
  }

  modulesPath = path.resolve('./node_modules')
  if (await checkNodeModulesPath(modulesPath)) {
    return nodeModulesPath
  }

  const hablePath = requireResolve('hable/package.json')
  modulesPath = path.dirname(path.dirname(hablePath))
  if (await checkNodeModulesPath(modulesPath)) {
    return nodeModulesPath
  }

  modulesPath = __dirname
  while (modulesPath.length > 1) {
    const tryPath = path.join(modulesPath, 'node_modules')
    modulesPath = path.dirname(modulesPath)

    if (await checkNodeModulesPath(tryPath)) {
      modulesPath = tryPath
      break
    }
  }

  if (modulesPath.length <= 1) {
    modulesPath = ''
  }

  nodeModulesPath = modulesPath
  return modulesPath
}
