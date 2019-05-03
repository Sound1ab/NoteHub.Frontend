import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NextLink,
  Operation,
} from 'apollo-boost'
import { GRAPHQL, LOCAL_STORAGE } from '../../enums'
import { LocalStorage } from '../LocalStorage'

const graphQL =
  process.env.NODE_ENV === 'development'
    ? GRAPHQL.DEV_GRAPHQL
    : GRAPHQL.PROD_GRAPHQL

console.log(graphQL)

const httpLink = new HttpLink({ uri: (graphQL as unknown) as string })

const authLink = new ApolloLink((operation: Operation, forward?: NextLink) => {
  const token = LocalStorage.getItem(LOCAL_STORAGE.KEY)

  operation.setContext({
    headers: {
      authorization: token ? `${token}` : '',
    },
  })

  return forward ? forward(operation) : null
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})
