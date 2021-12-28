import {
  MessageCallback,
  ProgressCallback,
  clone as gitClone,
} from 'isomorphic-git'

import { request } from '../GitFetchClient/request'
import { fs } from '../lightningFS'
import { refreshOnAuth } from './refreshOnAuth'

export interface IClone {
  url: string
  dir: string
  jwt: string | null
  onMessage?: MessageCallback
  onProgress?: ProgressCallback
}

export async function clone({ url, dir, onMessage, onProgress, jwt }: IClone) {
  await gitClone({
    fs,
    http: {
      request: request as never,
    },
    dir,
    url,
    onMessage,
    onProgress,
    corsProxy: process.env.REACT_APP_PROXY,
    headers: {
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : undefined),
    },
    onAuth: refreshOnAuth,
    singleBranch: true,
    depth: 1,
  })
}
