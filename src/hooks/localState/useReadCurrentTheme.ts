import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ReadCurrentThemeQuery,
  ReadCurrentThemeQueryVariables,
} from '../../components/apollo'
import { COLOR_MODE } from '../../enums'

const ReadCurrentThemeDocument = gql`
  query ReadCurrentTheme {
    currentTheme @client
  }
`

export function useReadCurrentTheme() {
  const client = useApolloClient()
  const { data } = useQuery<
    ReadCurrentThemeQuery,
    ReadCurrentThemeQueryVariables
  >(ReadCurrentThemeDocument)

  return {
    currentTheme:
      (data?.currentTheme as NonNullable<COLOR_MODE>) ?? COLOR_MODE.LIGHT,
    client,
  }
}
