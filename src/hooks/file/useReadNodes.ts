import { useQuery, gql } from '@apollo/client'

import {
  ReadNodesQuery,
  ReadNodesQueryVariables,
} from '../../components/apollo'
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
  const { data, loading, error } = useQuery<
    ReadNodesQuery,
    ReadNodesQueryVariables
  >(ReadNodesDocument)

  return { gitNodes: data?.readNodes.nodes, loading, error }
}
