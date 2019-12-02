import React, { ReactNode } from 'react'
import { ApolloProvider as ApolloProviderHooks } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SchemaLink } from 'apollo-link-schema'
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  IMocks,
} from 'graphql-tools'
import { printSchema, buildClientSchema } from 'graphql/utilities'
import introspectionResult from '../../../schema.json'

export const MockProvider: React.FunctionComponent<{
  children: ReactNode
  mockResolvers?: IMocks
}> = ({ children, mockResolvers }) => {
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

  const client = new ApolloClient({
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
    resolvers: {},
  })

  return <ApolloProviderHooks client={client}>{children}</ApolloProviderHooks>
}
