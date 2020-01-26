import { ApolloProvider as ApolloProviderHooks } from '@apollo/react-hooks'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import React, { ReactNode } from 'react'

import { COLOR_MODE } from '../../../enums'
import { IPosition } from '../../../hooks'
import { context, error, httpLink, lazy } from '../../../services/ApolloLink'

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

async function link(client: ApolloClient<NormalizedCacheObject>) {
  return ApolloLink.from([context(client), error(client), httpLink()])
}

export function ApolloProvider({ children }: IApolloProvider) {
  const cache = new InMemoryCache()

  cache.writeData({
    data: localData,
  })

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link: lazy(() => link(client)),
    resolvers: {},
  })

  return <ApolloProviderHooks client={client}>{children}</ApolloProviderHooks>
}
