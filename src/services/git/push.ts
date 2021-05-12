import { push as gitPush } from 'isomorphic-git'

import { request } from '../GitFetchClient/request'
import { fs } from '../lightningFS'

export interface IPush {
  dir: string
  jwt: string | null
}

export async function push({ dir, jwt }: IPush) {
  return gitPush({
    fs,
    http: {
      request: request as any,
    },
    dir,
    remote: 'origin',
    ref: 'main',
    headers: {
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : undefined),
    },
    corsProxy: process.env.REACT_APP_PROXY,
  })
}
