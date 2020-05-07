import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { Observable, execute, makePromise } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'

import { APOLLO_ERRORS } from '../../enums'

const GRAPHQL = process.env.REACT_APP_GRAPHQL

export function error(client: ApolloClient<NormalizedCacheObject>) {
  function resetStore() {
    client.clearStore()
    client.writeData({ data: { jwt: false } })
  }

  async function refetchToken() {
    try {
      const { data } = await makePromise(
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

      client.writeData({ data: { jwt: data.refresh } })

      return data.refresh
    } catch (error) {
      console.log('error', error)
    }
  }

  return onError(({ graphQLErrors, networkError, forward, operation }) => {
    if (networkError) console.log(`[Network error]: ${networkError}`)

    if (!graphQLErrors) {
      return
    }

    for (const err of graphQLErrors) {
      if (!err || !err.extensions) {
        return
      }
      switch (err.extensions.code) {
        case APOLLO_ERRORS.INTERNAL_SERVER_ERROR: {
          alert(err.message)
          break
        }
        case APOLLO_ERRORS.JWT_EXPIRED: {
          return new Observable(observer => {
            refetchToken()
              .then(jwt => {
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
              .catch(error => {
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
          return
      }
    }
  })
}
