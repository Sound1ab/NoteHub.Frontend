import { push as gitPush } from 'isomorphic-git'
import http from 'isomorphic-git/http/web'

import { fs } from '../lightningFS'

export interface IPush {
  dir: string
  jwt: string | null
}

export async function push({ dir, jwt }: IPush) {
  return gitPush({
    fs,
    http,
    dir,
    remote: 'origin',
    ref: 'main',
    headers: {
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : undefined),
    },
    corsProxy: process.env.REACT_APP_PROXY,
  })
}
