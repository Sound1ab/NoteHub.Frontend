import http from 'http'
import https from 'https'

import { Page } from 'playwright'

type Headers = { [key: string]: string }

export async function interceptTraffic(page: Page) {
  await page.route(/\/(graphql|proxy)/, async (route) => {
    const request = route.request()

    try {
      const { status, headers, body } = await makeRequest({
        url: request.url(),
        method: request.method(),
        headers: request.headers(),
        postData: request.postData(),
      })

      await route.fulfill({
        status,
        body,
        headers: {
          ...headers,
          'Access-Control-Allow-Origin': process.env.REACT_APP_CLIENT_BASE_URL!,
          'Access-Control-Allow-Credentials': 'true',
        },
      })
    } catch (e) {
      await route.abort(e.message)
    }
  })
}

interface IMakeRequest {
  url: string
  method: string
  headers: Headers
  postData: string | null
}

export async function makeRequest({
  url,
  method,
  headers,
  postData,
}: IMakeRequest): Promise<{
  body: string | Buffer
  status?: number
  headers: Headers
}> {
  let protocol = http

  if (url.includes('https://')) {
    // @ts-ignore
    protocol = https
  }

  const isGitRequest = url.includes(
    `github.com/${process.env.REACT_APP_REPO}/git-upload-pack`
  )

  return new Promise((res, rej) => {
    const req: http.ClientRequest = protocol.request(url, {
      method: method.toLowerCase(),
      headers,
    })

    req.on('error', (e) => {
      console.error('error', e)
      rej(e)
    })

    req.on('response', (response) => {
      if (isGitRequest) {
        response.setEncoding('binary')
      }

      let data: Uint8Array[] | string = isGitRequest ? [] : ''

      response.on('data', (chunk) => {
        if (Array.isArray(data)) {
          data.push(Buffer.from(chunk, 'binary'))
        } else {
          data += chunk
        }
      })

      response.on('end', () => {
        res({
          body: Array.isArray(data) ? Buffer.concat(data) : data,
          status: response.statusCode,
          headers: response.headers as Headers,
        })
      })
    })

    if (postData) {
      req.write(postData)
    }

    req.end()
  })
}
