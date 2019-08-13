import path from 'path'
import webpack from 'webpack'
import {
  readFile,
  exists,
  stats,
  glob,
  camelCase,
  findNodeModulesPath,
  createCacheKey,
  getCachePath
} from '.'

export async function createPageFunctions(page, sourceFiles, babelPresets) {
  const pageFunctions = {}

  if (!sourceFiles) {
    return pageFunctions
  }

  if (typeof sourceFiles === 'string') {
    sourceFiles = await glob(sourceFiles)
  }

  for (let file of sourceFiles) {
    let fnName
    if (Array.isArray(file)) {
      [file, fnName] = file
    } else {
      fnName = camelCase(path.basename(file, '.js'))
    }

    if (pageFunctions[fnName]) {
      // eslint-disable-next-line no-console
      console.warn(`A page function with name '${fnName}' already exists, the old one will be overwritten`)
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

export async function getPageFunctionBody(fnName, filePath, babelPresets) {
  const cacheKey = createCacheKey(filePath, babelPresets)
  const cacheFile = `${fnName}-${cacheKey}.js`
  const cachePath = await getCachePath(cacheFile)
  let cacheValid = await exists(cachePath)

  if (cacheValid) {
    const { mtime: fileModified } = await stats(filePath)
    const { mtime: cacheModified } = await stats(cachePath)

    cacheValid = fileModified >= cacheModified
  }

  if (!cacheValid) {
    // transpile page function
    await compilePageFunction({
      name: 'pageFn',
      filePath,
      cachePath,
      babelPresets
    })
  }

  const fnBody = await readFile(cachePath, { encoding: 'utf8' })
  return fnBody
}

export async function compilePageFunction({ babelPresets, ...config }) {
  let babelOptions

  if (babelPresets) {
    babelOptions = {
      presets: [
        ['@babel/preset-env', babelPresets]
      ]
    }
  } else {
    babelOptions = {
      babelrcRoots: [
        '.',
        path.resolve(await findNodeModulesPath(), '..')
      ]
    }
  }

  config.babelOptions = babelOptions

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
  babelOptions = {}
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
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: babelOptions
          }
        }
      ]
    }
  }
}
