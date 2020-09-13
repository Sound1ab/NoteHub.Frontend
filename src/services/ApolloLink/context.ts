import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'

import {
  ReadJwtQuery,
  ReadJwtQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { ReadJwtDocument } from '../../hooks'

export const context = (client: ApolloClient<NormalizedCacheObject>) =>
  setContext((_, { headers }) => {
    const jwtData = client.readQuery<ReadJwtQuery, ReadJwtQueryVariables>({
      query: ReadJwtDocument,
    })

    return {
      headers: {
        ...headers,
        Authorization: jwtData?.jwt ? `Bearer ${jwtData.jwt}` : '',
      },
    }
  })
