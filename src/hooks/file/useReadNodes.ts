import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ReadNodesQuery,
  ReadNodesQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { GitNodeFragment } from '../../fragments'

export const ReadNodesDocument = gql`
  ${GitNodeFragment}
  query ReadNodes {
    readNodes {
      nodes {
        ...gitNode
      }
    }
  }
`

export function useReadNodes() {
  const { data, loading } = useQuery<ReadNodesQuery, ReadNodesQueryVariables>(
    ReadNodesDocument
  )

  return { gitNodes: data?.readNodes.nodes, loading }
}
