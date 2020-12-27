import { MutationResult, gql, useMutation } from '@apollo/client'
import { ExecutionResult } from 'graphql'

import {
  CreateSignedUrlMutation,
  CreateSignedUrlMutationVariables,
} from '../../components/apollo/generated_components_typings'

export const CreateSignedUrlDocument = gql`
  mutation CreateSignedUrl {
    createSignedUrl
  }
`

export function useCreateSignedUrl(): [
  () => Promise<ExecutionResult<CreateSignedUrlMutation>>,
  MutationResult<CreateSignedUrlMutation>
] {
  const [mutation, rest] = useMutation<
    CreateSignedUrlMutation,
    CreateSignedUrlMutationVariables
  >(CreateSignedUrlDocument)

  return [mutation, rest]
}
