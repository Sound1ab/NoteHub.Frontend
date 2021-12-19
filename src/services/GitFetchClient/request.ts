import { GitHttpRequest, GitHttpResponse } from 'isomorphic-git'

/* eslint-env browser */
import { collect } from './utils/collect.js'
import { fromStream } from './utils/fromStream'

export const request = async ({
  onProgress,
  url,
  method = 'GET',
  headers = {},
  body,
  retryAttempt = 0,
}: GitHttpRequest & { retryAttempt: number }): Promise<GitHttpResponse> => {
  if (retryAttempt === 2) {
    throw new Error('Too many retries')
  }

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
  console.log('outer1')
  if (res.status === 401) {
    console.log('inner1', process.env.REACT_APP_SERVER_BASE_URL)
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/refresh`,
      {
        method: 'GET',
        headers,
        credentials: 'include',
      }
    )

    const jwt = await response.json()

    if (response.status !== 200 || !jwt) {
      throw new Error('No refresh token')
    }

    return request({
      onProgress,
      url,
      method,
      headers: {
        ...headers,
        Authorization: `Bearer ${jwt}`,
      },
      body,
      retryAttempt: retryAttempt + 1,
    })
  }

  const iter =
    res.body && res.body.getReader
      ? fromStream(res.body)
      : [new Uint8Array(await res.arrayBuffer())]
  // convert Header object to ordinary JSON
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
