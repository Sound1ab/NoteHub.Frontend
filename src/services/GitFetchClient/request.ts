import { GitHttpRequest, GitHttpResponse } from 'isomorphic-git'

/* eslint-env browser */
import { collect } from './utils/collect.js'
import { fromStream } from './utils/fromStream'

export const request = async ({
  url,
  method = 'GET',
  headers = {},
  body,
}: GitHttpRequest & { retryAttempt: number }): Promise<GitHttpResponse> => {
  // streaming uploads aren't possible yet in the browser
  let collectedBody

  if (body) {
    collectedBody = await collect(body)
  }

  const res = await fetch(url, {
    method,
    headers,
    body: collectedBody,
    credentials: 'include',
  })

  const iter =
    res.body && res.body.getReader
      ? fromStream(res.body)
      : [new Uint8Array(await res.arrayBuffer())]
  headers = {}
  for (const [key, value] of res.headers.entries()) {
    headers[key] = value
  }
  return {
    url: res.url,
    method,
    statusCode: res.status,
    statusMessage: res.statusText,
    body: iter,
    headers,
  }
}
