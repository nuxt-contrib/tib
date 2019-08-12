import path from 'path'

const resolve = p => path.resolve(__dirname, p)

export default [
  resolve('./navigate.js'),
  resolve('./navigateByClick.js'),
  resolve('./routeData.js')
]
