import { MutationResult } from '@apollo/react-common'
import { ExecutionResult } from '@apollo/react-common/lib/types/types'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  CreateImageMutation,
  CreateImageMutationVariables,
} from '../../components/apollo/generated_components_typings'
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
    content?: string
  ) => Promise<ExecutionResult<CreateImageMutation>>,
  MutationResult<CreateImageMutation>
] {
  const [mutation, rest] = useMutation<
    CreateImageMutation,
    CreateImageMutationVariables
  >(CreateImageDocument)

  async function createImage(path: string, content?: string) {
    if (!path) {
      throw new Error('Create file: missing path')
    }

    return mutation({
      variables: {
        input: {
          content: content ? content : `# ${name}`,
          path,
        },
      },
    })
  }

  return [createImage, rest]
}
