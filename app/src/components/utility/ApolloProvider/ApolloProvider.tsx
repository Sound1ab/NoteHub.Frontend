import React, { ReactNode } from 'react'
import { ApolloProvider as ApolloReactProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { client } from '../../../services/Apollo/clientConfig'

interface IApolloProvider {
  children?: ReactNode
}

export function ApolloProvider({ children }: IApolloProvider) {
  return (
    <ApolloReactProvider client={client}>
      <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>
    </ApolloReactProvider>
  )
}
