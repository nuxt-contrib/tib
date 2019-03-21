import path from 'path'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import defaultsDeep from 'lodash.defaultsdeep'

import { builtins } from './builtins'

const pkg = require('../package.json')

function rollupConfig({
  external = [],
  plugins = [],
  ...config
  } = {}) {

  return defaultsDeep({}, config, {
    inlineDynamicImports: false,
    external: [
      ...builtins,
      ...Object.keys(pkg.dependencies),
      ...external
    ],
    input: 'src/index.js',
    output: {
      name: 'tib',
      dir: path.dirname(pkg.main),
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
