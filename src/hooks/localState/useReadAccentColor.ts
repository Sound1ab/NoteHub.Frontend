import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ReadAccentColorQuery,
  ReadAccentColorQueryVariables,
} from '../../components/apollo'

const ReadAccentColorDocument = gql`
  query ReadAccentColor {
    accentColor @client
  }
`

export function useReadAccentColor() {
  const client = useApolloClient()
  const { data } = useQuery<
    ReadAccentColorQuery,
    ReadAccentColorQueryVariables
  >(ReadAccentColorDocument)

  return { accentColor: data?.accentColor, client }
}
