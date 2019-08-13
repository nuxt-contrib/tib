import fs from 'fs'
import util from 'util'
import Glob from 'glob'

export const readDir = util.promisify(fs.readdir)
export const readFile = util.promisify(fs.readFile)
export const glob = util.promisify(Glob)

export function exists(p) {
  return new Promise((resolve, reject) => {
    fs.access(p, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false)
        return
      }

      resolve(true)
    })
  })
}

export function stats(p) {
  return new Promise((resolve, reject) => {
    fs.stat(p, (err, stats) => {
      if (err) {
        resolve(false)
        return
      }

      resolve(stats)
    })
  })
}

export function requireResolve(path) {
  return require.resolve(path)
}
