import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ReadCursorPositionQuery,
  ReadCursorPositionQueryVariables,
} from '../../components/apollo'

const ReadCursorPositionDocument = gql`
  query ReadCursorPosition {
    cursorPosition {
      ch @client
      line @client
    }
  }
`

export function useReadCursorPosition() {
  const client = useApolloClient()
  const { data } = useQuery<
    ReadCursorPositionQuery,
    ReadCursorPositionQueryVariables
  >(ReadCursorPositionDocument)

  return {
    cursorPosition: data?.cursorPosition ?? {
      ch: 0,
      line: 0,
      __typename: 'Position',
    },
    client,
  }
}
