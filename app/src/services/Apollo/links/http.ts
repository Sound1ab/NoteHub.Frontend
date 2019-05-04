import { HttpLink } from 'apollo-boost'
import { GRAPHQL } from '../../../enums'

const graphQL =
  process.env.NODE_ENV === 'development'
    ? GRAPHQL.DEV_GRAPHQL
    : GRAPHQL.PROD_GRAPHQL

export const httpLink = new HttpLink({ uri: (graphQL as unknown) as string })
