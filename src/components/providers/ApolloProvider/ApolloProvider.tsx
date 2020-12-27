import {
  ApolloClient,
  ApolloLink,
  ApolloProvider as ApolloProviderHooks,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import React, { ReactNode } from 'react'

import { error } from '../../../services/ApolloLink/error'
import { context } from '../../../services/ApolloLink/context'
import { httpLink } from '../../../services/ApolloLink/httpLink'
import { lazy } from '../../../services/ApolloLink/lazy'
import { cacheOptions } from './cache'

interface IApolloProvider {
  children?: ReactNode
}

async function link(client: ApolloClient<NormalizedCacheObject>) {
  return ApolloLink.from([context(), error(client), httpLink()])
}

export function ApolloProvider({ children }: IApolloProvider) {
  const cache = new InMemoryCache(cacheOptions)

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link: lazy(() => link(client)),
    resolvers: {},
  })

  return <ApolloProviderHooks client={client}>{children}</ApolloProviderHooks>
}
