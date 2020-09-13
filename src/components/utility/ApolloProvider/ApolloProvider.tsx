import { ApolloProvider as ApolloProviderHooks } from '@apollo/react-hooks'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import React, { ReactNode } from 'react'

import { COLOR_MODE } from '../../../enums'
import { context, error, httpLink, lazy } from '../../../services/ApolloLink'
import { IPosition } from '../../../types'

export interface ILocalData {
  currentRepoName: string | null
  currentPath: string | null
  currentTheme: COLOR_MODE | null
  cursorPosition: IPosition
  jwt: string | null
  accentColor: string | null
}

export const localData: ILocalData = {
  currentRepoName: 'NoteHub.Notebook',
  currentPath: null,
  currentTheme: null,
  cursorPosition: {
    ch: 0,
    line: 0,
    __typename: 'Position',
  },
  jwt: null,
  accentColor: null,
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
