import React, { ReactNode } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
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
import { LocalData, localData as defaultLocalData } from './ApolloProvider'

export const MockProvider: React.FunctionComponent<{
  children: ReactNode
  mockResolvers?: IMocks
  localData?: Partial<LocalData>
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

  if (localData) {
  }

  addMockFunctionsToSchema({ schema, mocks: mockResolvers })

  const client = new ApolloClient({
    link: new SchemaLink({ schema }),
    cache: cache,
    resolvers: {},
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
