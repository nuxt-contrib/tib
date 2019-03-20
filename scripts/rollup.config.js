import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import defaultsDeep from 'lodash.defaultsdeep'

const pkg = require('../package.json')

function rollupConfig({
  plugins = [],
  ...config
  } = {}) {

  return defaultsDeep({}, config, {
    inlineDynamicImports: true,
    external: Object.keys(pkg.dependencies),
    input: 'src/index.js',
    output: {
      name: 'tib',
      file: pkg.main,
      format: 'cjs',
      sourcemap: false
    },
    plugins: [
      json(),
      nodeResolve(),
      commonjs()
    ].concat(plugins),
  })
}

export default [
  rollupConfig()
]
