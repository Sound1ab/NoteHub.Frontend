import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { SchemaLink } from 'apollo-link-schema'
import {
  IMocks,
  addMockFunctionsToSchema,
  makeExecutableSchema,
} from 'graphql-tools'
import { buildClientSchema, printSchema } from 'graphql/utilities'
import React, { ReactNode } from 'react'

import introspectionResult from '../../../schema.json'
import { context, error, lazy } from '../../../services/ApolloLink'
import { ILocalData, localData as defaultLocalData } from './ApolloProvider'

async function link(client: ApolloClient<NormalizedCacheObject>, schema: any) {
  return ApolloLink.from([
    context(client),
    error(client),
    new SchemaLink({ schema }),
  ])
}

export const MockProvider: React.FunctionComponent<{
  children: ReactNode
  mockResolvers?: IMocks
  localData?: Partial<ILocalData>
}> = ({ children, mockResolvers, localData }: any) => {
  const schemaSDL = printSchema(
    buildClientSchema({ __schema: introspectionResult.__schema as any })
  )

  const schema = makeExecutableSchema({
    typeDefs: schemaSDL,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  })

  const cache = new InMemoryCache()

  cache.writeData({
    data: {
      ...defaultLocalData,
      ...localData,
    },
  })

  addMockFunctionsToSchema({ schema, mocks: mockResolvers })

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: lazy(() => link(client, schema)),
    cache: cache,
    resolvers: {},
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
