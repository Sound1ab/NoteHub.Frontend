import {
  ApolloClient,
  ApolloLink,
  ApolloProvider as ApolloProviderHooks,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { persistCacheSync } from 'apollo3-cache-persist'
import React, { ReactNode } from 'react'

import { context, error, httpLink, lazy } from '../../../services/ApolloLink'
import { fields } from './cache'

interface IApolloProvider {
  children?: ReactNode
}

async function link(client: ApolloClient<NormalizedCacheObject>) {
  return ApolloLink.from([context(), error(client), httpLink()])
}

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields,
    },
    // File doesn't have an ID so apollo doesn't know how to merge new
    // request. Use 'path' as the ID and make sure to always overwrite
    // incoming messages
    File: {
      keyFields: ['path'],
      fields: {
        messages: {
          merge: false,
        },
      },
    },
  },
})

persistCacheSync({
  cache,
  storage: window.localStorage,
})

export function ApolloProvider({ children }: IApolloProvider) {
  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link: lazy(() => link(client)),
    resolvers: {},
  })

  return <ApolloProviderHooks client={client}>{children}</ApolloProviderHooks>
}
