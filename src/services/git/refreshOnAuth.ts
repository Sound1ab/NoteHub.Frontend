import { AuthCallback } from 'isomorphic-git'

let abortController: AbortController

export const refreshOnAuth: AuthCallback = async (url, { headers }) => {
  if (abortController) {
    abortController.abort()
  }

  abortController = new AbortController()

  console.log('here', headers)
  if (!headers?.Authorization) {
    throw new Error('No auth header set, refresh failing')
  }

  const { Authorization } = headers

  const response = await fetch(
    `${process.env.REACT_APP_SERVER_BASE_URL}/refresh`,
    {
      method: 'GET',
      headers: {
        Authorization,
      },
      credentials: 'include',
      signal: abortController.signal,
    }
  )

  const jwt = await response.json()

  if (response.status !== 200 || !jwt) {
    throw new Error('No refresh token')
  }

  return {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }
}
