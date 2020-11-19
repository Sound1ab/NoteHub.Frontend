import {
  ApolloClient,
  HttpLink,
  NormalizedCacheObject,
  Observable,
  execute,
  gql,
  toPromise,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'

import { localState } from '../../components/providers/ApolloProvider/cache'
import { APOLLO_ERRORS } from '../../enums'

const GRAPHQL = process.env.REACT_APP_GRAPHQL

export function error(client: ApolloClient<NormalizedCacheObject>) {
  function resetStore() {
    localState.currentJwtVar(null)
    client.cache.gc()
  }

  async function refetchToken() {
    const { data } = await toPromise(
      execute(new HttpLink({ uri: GRAPHQL, credentials: 'include' }), {
        query: gql`
          {
            refresh
          }
        `,
      })
    )

    if (!data?.refresh) {
      throw new Error('No refresh token')
    }

    localState.currentJwtVar(data.refresh)

    return data.refresh
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

                  forward(operation).subscribe(subscriber)
                })
                .catch((error) => {
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
