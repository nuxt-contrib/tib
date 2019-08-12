import { createHash } from 'crypto'
import path from 'path'
import webpack from 'webpack'
import { camelCase } from '../utils'
import {
  readFile,
  exists,
  stats,
  requireResolve
} from './fs'

let packageName
let nodeModulesPath

/* export async function listPageFunctionSources(fnPath) {
  if (!fnPath) {
    fnPath = path.join(__dirname, 'page-functions')
  }

  const files = await readDir(fnPath, { encoding: 'utf8' })
  return files.filter(file => file.endsWith('.js'))
} */

export function createPageFunctions(page, sourceFiles) {
  const pageFunctions = {}

  if (!sourceFiles) {
    return pageFunctions
  }

  const babelPresets = page.getBabelPresetOptions()

  for (let file of sourceFiles) {
    let fnName
    if (Array.isArray(file)) {
      [file, fnName] = file
    } else {
      fnName = camelCase(path.basename(file, '.js'))
    }

    pageFunctions[fnName] = async (...args) => {
      const body = await getPageFunctionBody(fnName, file, babelPresets)

      return page.runAsyncScript({
        args: [],
        body: `${body} return (pageFn.${fnName} || pageFn.default).apply(null, arguments)`
      }, ...args)
    }
  }

  return pageFunctions
}

export async function getPageFunctionBody(fnName, filePath, presetOptions = {}) {
  const cacheKey = createCacheKey(filePath, presetOptions)
  const cacheFile = `${fnName}-${cacheKey}.js`
  const cachePath = await getCacheEntry(cacheFile)
  let cacheValid = await exists(cachePath)

  if (cacheValid) {
    const { mtime: fm } = await stats(filePath)
    const { mtime: cm } = await stats(cachePath)

    if (fm >= cm) {
      cacheValid = false
    }
  }

  if (!cacheValid) {
    // transpile page function
    await compilePageFunction({
      name: 'pageFn',
      filePath,
      cachePath,
      presetOptions
    })
  }

  const fnBody = await readFile(cachePath, { encoding: 'utf8' })
  return fnBody
}

export function compilePageFunction(config) {
  return new Promise((resolve, reject) => {
    const webpackConfig = createWebpackConfig(config)

    webpack(webpackConfig, (err, stats) => {
      /* istanbul ignore next */
      if (err) {
        reject(err)
        return
      }

      if (stats.hasErrors()) {
        const [err] = stats.compilation.errors
        reject(err)
        return
      }

      resolve(stats)
    })
  })
}
export function createWebpackConfig({
  name,
  filePath,
  cachePath,
  presetOptions
}) {
  return {
    mode: 'production',
    entry: filePath,
    output: {
      path: path.dirname(cachePath),
      filename: path.basename(cachePath),
      library: name,
      libraryTarget: 'var'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', presetOptions]
              ]
            }
          }
        }
      ]
    }
  }
}

export function createCacheKey(fn, opts) {
  if (typeof opts !== 'string') {
    opts = JSON.stringify(opts)
  }

  return createHash('md5').update(`${fn}-x-${opts}`).digest('hex')
}

export async function getPackageName(modulesPath) {
  if (!packageName) {
    const { name } = await import(path.resolve(modulesPath, '..', 'package.json'))
    packageName = name
  }

  return packageName
}

export async function getCacheEntry(filePath = '') {
  const modulesPath = await findNodeModulesPath()
  const name = await getPackageName(modulesPath)

  return path.join(modulesPath, '.cache', name, filePath)
}

export async function findNodeModulesPath(refresh) {
  if (nodeModulesPath && !refresh) {
    return nodeModulesPath
  }

  const hablePath = requireResolve('hable/package.json')
  let modulesPath = path.dirname(path.dirname(hablePath))

  let pathExists = await exists(modulesPath)
  if (pathExists) {
    nodeModulesPath = modulesPath
    return modulesPath
  }

  modulesPath = path.resolve('./node_modules')

  pathExists = await exists(modulesPath)
  if (pathExists) {
    nodeModulesPath = modulesPath
    return modulesPath
  }

  modulesPath = __dirname
  while (modulesPath.length > 1) {
    const tryPath = path.join(modulesPath, 'node_modules')
    modulesPath = path.dirname(modulesPath)

    const pathExists = await exists(tryPath)
    if (pathExists) {
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