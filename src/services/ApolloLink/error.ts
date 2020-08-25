import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { FetchResult, Observable, execute, makePromise } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import { ServerError } from 'apollo-link-http-common'
import gql from 'graphql-tag'

import { APOLLO_ERRORS } from '../../enums'

const GRAPHQL = process.env.REACT_APP_GRAPHQL

function isServerError(error: any): error is ServerError {
  return error !== null && error !== undefined && error.result
}

export function error(client: ApolloClient<NormalizedCacheObject>) {
  function resetStore() {
    client.clearStore()
    client.writeData({ data: { jwt: false } })
  }

  async function refetchToken() {
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
  }

  return onError(({ graphQLErrors, networkError, forward, operation }) => {
    function errorSwitch(
      errors: ReadonlyArray<{
        extensions: { [key: string]: any } | undefined
      }>
    ): void | Observable<
      FetchResult<
        { [key: string]: any },
        Record<string, any>,
        Record<string, any>
      >
    > {
      for (const err of errors) {
        if (!err || !err.extensions) {
          return
        }
        switch (err.extensions.code) {
          case APOLLO_ERRORS.INTERNAL_SERVER_ERROR: {
            // Handle error in component
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
            // Handle error in component
            return
        }
      }
    }

    if (networkError) {
      if (isServerError(networkError)) {
        // Apollo server does not return graphQL errors for errors thrown
        // outside a resolver. As we're checking jwt when configuring the
        // datasources on the server a network error is thrown for expired
        // jwts. This checks the error extensions as if it were a graphQL error
        return errorSwitch(networkError.result.errors)
      }
      // redirect to 404 page
      return
    }

    if (graphQLErrors) {
      return errorSwitch(graphQLErrors)
    }
  })
}
