import { ApolloClient, NormalizedCacheObject, Observable } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

import { localState } from '../../components/providers/ApolloProvider/cache'
import { APOLLO_ERRORS } from '../../enums'

export function error(client: ApolloClient<NormalizedCacheObject>) {
  function resetStore() {
    localState.currentJwtVar(null)
    client.cache.gc()
  }

  async function refetchToken() {
    console.log('in refresh token')
    const jwt = localState.currentJwtVar()

    console.log('old jwt', jwt)
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/refresh`,
      {
        method: 'GET',
        headers: {
          Authorization: jwt ? `Bearer ${jwt}` : '',
        },
        credentials: 'include',
      }
    )

    console.log('response', response)

    const regeneratedJwt = await response.json()

    console.log('regenerated jwt', regeneratedJwt)

    if (response.status !== 200 || !regeneratedJwt) {
      throw new Error('No refresh token')
    }

    console.log('setting jwt')

    localState.currentJwtVar(regeneratedJwt)

    return regeneratedJwt
  }

  return onError(({ graphQLErrors, networkError, forward, operation }) => {
    if (networkError) {
      // redirect to 404 page
      return
    }

    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (!err || !err.extensions) {
          return
        }
        switch (err.extensions.code) {
          case APOLLO_ERRORS.INTERNAL_SERVER_ERROR: {
            break
          }
          case APOLLO_ERRORS.JWT_EXPIRED: {
            return new Observable((observer) => {
              refetchToken()
                .then((jwt) => {
                  const subscriber = {
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                  }

                  const oldHeaders = operation.getContext().headers
                  operation.setContext({
                    headers: {
                      ...oldHeaders,
                      Authorization: `Bearer ${jwt}`,
                    },
                  })

                  console.log('setting new context', operation.getContext())

                  forward(operation).subscribe(subscriber)
                })
                .catch((error) => {
                  console.log('error', error)
                  resetStore()
                  observer.error(error)
                })
            })
          }
          case APOLLO_ERRORS.JWT_SIGNATURE_MISMATCH:
          case APOLLO_ERRORS.REFRESH_TOKEN_EXPIRED:
          case APOLLO_ERRORS.REFRESH_TOKEN_NOT_VALID:
          case APOLLO_ERRORS.UNAUTHENTICATED:
            resetStore()
            break
          default:
            // Handle error in component
            return
        }
      }
    }
  })
}
