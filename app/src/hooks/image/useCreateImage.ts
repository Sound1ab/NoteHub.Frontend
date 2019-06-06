import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
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

export function useCreateImage() {
  return useMutation<CreateImageMutation, CreateImageMutationVariables>(
    CreateImageDocument
  )
}
