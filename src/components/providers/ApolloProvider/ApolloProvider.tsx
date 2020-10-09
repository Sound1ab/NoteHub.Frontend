import {
  ApolloClient,
  ApolloLink,
  ApolloProvider as ApolloProviderHooks,
  NormalizedCacheObject,
} from '@apollo/client'
import React, { ReactNode } from 'react'

import { context, error, httpLink, lazy } from '../../../services/ApolloLink'
import { cache } from './cache'

interface IApolloProvider {
  children?: ReactNode
}

async function link(client: ApolloClient<NormalizedCacheObject>) {
  return ApolloLink.from([context(), error(client), httpLink()])
}

export function ApolloProvider({ children }: IApolloProvider) {
  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link: lazy(() => link(client)),
    resolvers: {},
  })

  return <ApolloProviderHooks client={client}>{children}</ApolloProviderHooks>
}
