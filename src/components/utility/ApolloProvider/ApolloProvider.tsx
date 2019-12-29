import { ApolloProvider as ApolloProviderHooks } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import React, { ReactNode } from 'react'

import { COLOR_MODE } from '../../../enums'
import { authLink, errorLink, httpLink } from '../../../services/Apollo/links'

export interface ILocalData {
  currentRepoName: string | null
  currentFileName: string | null
  currentTheme: COLOR_MODE | null
  isEdit: boolean
  isNewFileOpen: boolean
}

export const localData: ILocalData = {
  currentRepoName: null,
  currentFileName: null,
  currentTheme: null,
  isEdit: true,
  isNewFileOpen: false,
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
