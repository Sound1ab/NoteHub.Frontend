import { push as gitPush } from 'isomorphic-git'
import http from 'isomorphic-git/http/web'

import { fs } from '../lightningFS'

export interface IPush {
  dir: string
}

export async function push({ dir }: IPush) {
  return gitPush({
    fs,
    http,
    dir,
    remote: 'origin',
    ref: 'main',
    onAuth: () => ({ username: process.env.REACT_APP_PAT }),
    corsProxy: process.env.REACT_APP_PROXY,
  })
}
