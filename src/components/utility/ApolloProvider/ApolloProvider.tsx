import React, { ReactNode } from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider as ApolloProviderHooks } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { authLink, errorLink, httpLink } from '../../../services/Apollo/links'

export interface ILocalData {
  currentRepoName: string | null
  currentFileName: string | null
}

export const localData: ILocalData = {
  currentRepoName: null,
  currentFileName: null,
}

interface IApolloProvider {
  children?: ReactNode
}

export function ApolloProvider({ children }: IApolloProvider) {
  const link = ApolloLink.from([errorLink, authLink, httpLink])

  const cache = new InMemoryCache()

  cache.writeData({
    data: localData,
  })

  const client = new ApolloClient({
    cache,
    link,
    resolvers: {},
  })

  return <ApolloProviderHooks client={client}>{children}</ApolloProviderHooks>
}
