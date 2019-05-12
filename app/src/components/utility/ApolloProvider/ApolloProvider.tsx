import React, { ReactNode, useRef } from 'react'
import { ApolloProvider as ApolloReactProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { useStore } from '../../../hooks'
import { createClient } from '../../../services/Apollo/clientConfig'

interface IApolloProvider {
  children?: ReactNode
}

export function ApolloProvider({ children}: IApolloProvider) {
  const [state, dispatch] = useStore()
  const client = useRef(createClient(state, dispatch))

  return (
    <ApolloReactProvider client={client.current}>
      <ApolloHooksProvider client={client.current}>
        {children}
      </ApolloHooksProvider>
    </ApolloReactProvider>
  )
}
