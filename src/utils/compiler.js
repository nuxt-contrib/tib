import { compile } from 'vue-template-compiler'

export function getDefaultHtmlCompiler() {
  return html => compile(html).ast
}
