import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import { act } from '@testing-library/react'
import { GraphQLSchema } from 'graphql'
import {
  IMocks,
  addMockFunctionsToSchema,
  makeExecutableSchema,
} from 'graphql-tools'
import { buildClientSchema, printSchema } from 'graphql/utilities'
import React, { ReactNode } from 'react'

import introspectionResult from '../../../schema.json'
import { context, error, lazy } from '../../../services/ApolloLink'
import { Fields, cacheOptions } from './cache'

async function link(
  client: ApolloClient<NormalizedCacheObject>,
  schema: GraphQLSchema
) {
  return ApolloLink.from([context(), error(client), new SchemaLink({ schema })])
}

interface IMockProvider {
  children: ReactNode
  mockResolvers?: IMocks
  localData?: Partial<Fields>
}

export const MockProvider = ({
  children,
  mockResolvers,
  localData,
}: IMockProvider) => {
  const cache = new InMemoryCache(cacheOptions)

  const schemaSDL = printSchema(
    // @ts-ignore
    buildClientSchema({ __schema: introspectionResult.__schema })
  )

  const schema = makeExecutableSchema({
    typeDefs: schemaSDL,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  })

  addMockFunctionsToSchema({ schema, mocks: mockResolvers })

  if (localData) {
    act(() => {
      Object.values(localData).forEach((entry) => entry && entry())
    })
  }

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: lazy(() => link(client, schema)),
    cache,
    resolvers: {},
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
