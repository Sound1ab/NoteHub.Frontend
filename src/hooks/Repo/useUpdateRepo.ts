import { MutationResult } from '@apollo/react-common'
import { ExecutionResult } from '@apollo/react-common/lib/types/types'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ReadRepoQuery,
  ReadRepoQueryVariables,
  UpdateRepoMutation,
  UpdateRepoMutationVariables,
} from '../../components/apollo'
import { RepoFragment } from '../../fragments'
import { ReadRepoDocument } from './useReadRepo'

export const UpdateRepoDocument = gql`
  ${RepoFragment}
  mutation UpdateRepo($input: UpdateRepoInput!) {
    updateRepo(input: $input) {
      ...repo
    }
  }
`

export function useUpdateRepo(): [
  (
    name: string,
    description: string,
    isPrivate: boolean
  ) => Promise<ExecutionResult<UpdateRepoMutation>>,
  MutationResult<UpdateRepoMutation>
] {
  const [mutation, rest] = useMutation<
    UpdateRepoMutation,
    UpdateRepoMutationVariables
  >(UpdateRepoDocument, {
    update: (cache, { data }) => {
      const updatedRepo = data && data.updateRepo
      if (!updatedRepo) return
      const result = cache.readQuery<ReadRepoQuery, ReadRepoQueryVariables>({
        query: ReadRepoDocument,
      })

      const repo = result?.readRepo

      if (!repo) {
        throw new Error('Can not update repo that does not exist')
      }

      cache.writeQuery<ReadRepoQuery, ReadRepoQueryVariables>({
        data: {
          readRepo: {
            ...repo,
            ...updatedRepo,
          },
        },
        query: ReadRepoDocument,
      })
    },
  })

  async function updateRepo(
    name: string,
    description: string,
    isPrivate: boolean
  ) {
    return mutation({
      optimisticResponse: {
        __typename: 'Mutation',
        updateRepo: {
          __typename: 'Repo',
          name,
          description,
          private: isPrivate,
        },
      },
    })
  }

  return [updateRepo, rest]
}
