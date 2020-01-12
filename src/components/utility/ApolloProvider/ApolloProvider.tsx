import { ApolloProvider as ApolloProviderHooks } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import React, { ReactNode } from 'react'

import { APOLLO_ERRORS, COLOR_MODE } from '../../../enums'
import { IPosition } from '../../../hooks'

const GRAPHQL = process.env.REACT_APP_GRAPHQL

export interface ILocalData {
  currentRepoName: string | null
  currentFileName: string | null
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
              case APOLLO_ERRORS.UNAUTHENTICATED:
                client.clearStore()
                client.writeData({ data: { isAuthorised: false } })
                break
              default:
                return
            }
          }
        }

        if (networkError) console.log(`[Network error]: ${networkError}`)
      }),
      new HttpLink({ uri: GRAPHQL, credentials: 'include' }),
    ]),
    resolvers: {},
  })

  return <ApolloProviderHooks client={client}>{children}</ApolloProviderHooks>
}
