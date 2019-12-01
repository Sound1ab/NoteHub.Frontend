import React, { ReactNode } from 'react'
import { ApolloProvider } from 'react-apollo-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SchemaLink } from 'apollo-link-schema'
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  IMocks,
} from 'graphql-tools'
import { printSchema, buildClientSchema } from 'graphql/utilities'
import introspectionResult from '../../../../schema.json'

export const AutoMockedProvider: React.FunctionComponent<{
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
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
