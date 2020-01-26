import { ApolloProvider as ApolloProviderHooks } from '@apollo/react-hooks'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import React, { ReactNode } from 'react'

import { APOLLO_ERRORS, COLOR_MODE } from '../../../enums'
import { IPosition, ReadJwtDocument, RefreshDocument } from '../../../hooks'
import {
  ReadJwtQuery,
  ReadJwtQueryVariables,
  RefreshQuery,
  RefreshQueryVariables,
} from '../../apollo/generated_components_typings'

const GRAPHQL = process.env.REACT_APP_GRAPHQL

export interface ILocalData {
  currentRepoName: string | null
  currentFileName: string | null
  jwt: string | null
  currentTheme: COLOR_MODE | null
  isEdit: boolean
  isNewFileOpen: boolean
  isNewRepoOpen: boolean
  isAuthorised: boolean
  cursorPosition: IPosition
}

export const localData: ILocalData = {
  currentRepoName: null,
  currentFileName: null,
  currentTheme: null,
  isEdit: true,
  isNewFileOpen: false,
  isNewRepoOpen: false,
  isAuthorised: false,
  jwt: null,
  cursorPosition: {
    ch: 0,
    line: 0,
    __typename: 'Position',
  },
}

interface IApolloProvider {
  children?: ReactNode
}

export function ApolloProvider({ children }: IApolloProvider) {
  const cache = new InMemoryCache()

  cache.writeData({
    data: localData,
  })

  function resetStore(client: ApolloClient<NormalizedCacheObject>) {
    client.clearStore()
    client.writeData({ data: { jwt: false } })
  }

  const client = new ApolloClient({
    cache,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          for (const err of graphQLErrors) {
            if (!err || !err.extensions) {
              return
            }
            switch (err.extensions.code) {
              case APOLLO_ERRORS.JWT_EXPIRED: {
                const data = client.readQuery<
                  RefreshQuery,
                  RefreshQueryVariables
                >({ query: RefreshDocument })

                if (!data?.refresh) {
                  resetStore(client)
                  return
                }

                client.writeData({ data: { jwt: data.refresh } })
                return
              }
              case APOLLO_ERRORS.JWT_SIGNATURE_MISMATCH:
              case APOLLO_ERRORS.REFRESH_TOKEN_EXPIRED:
              case APOLLO_ERRORS.REFRESH_TOKEN_NOT_VALID:
              case APOLLO_ERRORS.UNAUTHENTICATED:
                resetStore(client)
                break
              default:
                return
            }
          }
        }

        if (networkError) console.log(`[Network error]: ${networkError}`)
      }),
      setContext((_, { headers }) => {
        const data: any = client.readQuery<ReadJwtQuery, ReadJwtQueryVariables>(
          { query: ReadJwtDocument }
        )
        return {
          headers: {
            ...headers,
            Authorization: data.jwt ? `Bearer ${data.jwt}` : '',
          },
        }
      }),
      new HttpLink({ uri: GRAPHQL, credentials: 'include' }),
    ]),
    resolvers: {},
  })

  return <ApolloProviderHooks client={client}>{children}</ApolloProviderHooks>
}
