import {
  MessageCallback,
  ProgressCallback,
  clone as gitClone,
} from 'isomorphic-git'
import http from 'isomorphic-git/http/web'

import { fs } from '../lightningFS'

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
    http,
    dir,
    url,
    onMessage,
    onProgress,
    corsProxy: process.env.REACT_APP_PROXY,
    headers: {
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : undefined),
    },
  })
}
