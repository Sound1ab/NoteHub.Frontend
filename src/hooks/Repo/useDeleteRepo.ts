import { MutationResult } from '@apollo/react-common'
import { ExecutionResult } from '@apollo/react-common/lib/types/types'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  DeleteRepoMutation,
  DeleteRepoMutationVariables,
  ReadRepoQuery,
  ReadRepoQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { RepoFragment } from '../../fragments'
import { ReadRepoDocument } from '..'

export const DeleteRepoDocument = gql`
  ${RepoFragment}
  mutation DeleteRepo {
    deleteRepo {
      ...repo
    }
  }
`

export function useDeleteRepo(): [
  (path: string) => Promise<ExecutionResult<DeleteRepoMutation>>,
  MutationResult<DeleteRepoMutation>
] {
  const client = useApolloClient()

  const [mutation, rest] = useMutation<
    DeleteRepoMutation,
    DeleteRepoMutationVariables
  >(DeleteRepoDocument, {
    update: (cache) => {
      cache.writeQuery<ReadRepoQuery, ReadRepoQueryVariables>({
        data: {
          readRepo: null,
        },
        query: ReadRepoDocument,
      })
    },
  })

  async function deleteRepo() {
    client.writeData({
      data: { currentRepoName: null },
    })
    return await mutation({
      optimisticResponse: {
        __typename: 'Mutation',
        deleteRepo: {
          __typename: 'Repo',
          name: 'optimistic',
          description: 'optimistic',
          private: false,
        },
      },
    })
  }

  return [deleteRepo, rest]
}
