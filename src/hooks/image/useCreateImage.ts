import { useMutation, gql, MutationResult } from '@apollo/client'
import { ExecutionResult } from 'graphql'

import {
  CreateImageMutation,
  CreateImageMutationVariables,
} from '../../components/apollo'
import { FileFragment } from '../../fragments'

export const CreateImageDocument = gql`
  ${FileFragment}
  mutation CreateImage($input: CreateFileInput!) {
    createImage(input: $input) {
      ...file
    }
  }
`

export function useCreateImage(): [
  (
    path: string,
    content?: string | ArrayBuffer | null
  ) => Promise<ExecutionResult<CreateImageMutation>>,
  MutationResult<CreateImageMutation>
] {
  const [mutation, rest] = useMutation<
    CreateImageMutation,
    CreateImageMutationVariables
  >(CreateImageDocument)

  async function createImage(
    path: string,
    content?: string | ArrayBuffer | null
  ) {
    if (!path) {
      throw new Error('Create file: missing path')
    }

    if (!content || typeof content !== 'string') {
      throw new Error('Create file: no content')
    }

    return mutation({
      variables: {
        input: {
          content,
          path,
        },
      },
    })
  }

  return [createImage, rest]
}
