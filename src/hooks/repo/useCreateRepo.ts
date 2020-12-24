import { MutationResult, gql, useMutation } from '@apollo/client'
import { ExecutionResult } from 'graphql'

import {
  CreateRepoMutation,
  CreateRepoMutationVariables,
} from '../../components/apollo'
import { RepoFragment } from '../../fragments'

export const CreateRepoDocument = gql`
  ${RepoFragment}
  mutation CreateRepo {
    createRepo {
      ...repo
    }
  }
`

export function useCreateRepo(): [
  () => Promise<ExecutionResult<CreateRepoMutation>>,
  MutationResult<CreateRepoMutation>
] {
  const [mutation, rest] = useMutation<
    CreateRepoMutation,
    CreateRepoMutationVariables
  >(CreateRepoDocument)

  async function createRepo() {
    return await mutation()
  }

  return [createRepo, rest]
}
