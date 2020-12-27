import { MutationResult, gql, useMutation } from '@apollo/client'
import { ExecutionResult } from 'graphql'

import {
  DeleteRepoMutation,
  DeleteRepoMutationVariables,
  ReadRepoQuery,
  ReadRepoQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { localState } from '../../components/providers/ApolloProvider/cache'
import { RepoFragment } from '../../fragments'
import { ReadRepoDocument } from './useReadRepo'

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
    localState.currentRepoNameVar('')

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
