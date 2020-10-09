import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import {
  IMocks,
  addMockFunctionsToSchema,
  makeExecutableSchema,
} from 'graphql-tools'
import { buildClientSchema, printSchema } from 'graphql/utilities'
import React, { ReactNode } from 'react'

import introspectionResult from '../../../schema.json'
import { context, error, lazy } from '../../../services/ApolloLink'
import { cache } from './cache'

async function link(client: ApolloClient<NormalizedCacheObject>, schema: any) {
  return ApolloLink.from([context(), error(client), new SchemaLink({ schema })])
}

export const MockProvider: React.FunctionComponent<{
  children: ReactNode
  mockResolvers?: IMocks
}> = ({ children, mockResolvers }: any) => {
  const schemaSDL = printSchema(
    buildClientSchema({ __schema: introspectionResult.__schema as any })
  )

  const schema = makeExecutableSchema({
    typeDefs: schemaSDL,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  })

  addMockFunctionsToSchema({ schema, mocks: mockResolvers })

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: lazy(() => link(client, schema)),
    cache,
    resolvers: {},
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
