import { createHash } from 'crypto'

export const md5sum = str => createHash('md5').update(str).digest('hex')
