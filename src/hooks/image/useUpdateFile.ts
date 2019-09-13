import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import {
  ReadImageDocument,
  ReadImageQuery,
  ReadImageQueryVariables,
  UpdateImageMutation,
  UpdateImageMutationVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'

export const UpdateImageDocument = gql`
  ${FileFragment}
  mutation UpdateImage($input: UpdateFileInput!) {
    updateImage(input: $input) {
      ...file
    }
  }
`

export function useUpdateImage(
  username: string,
  repo: string,
  filename: string
) {
  return useMutation<UpdateImageMutation, UpdateImageMutationVariables>(
    UpdateImageDocument,
    {
      update: (cache, { data }) => {
        const updatedImage = data && data.updateImage
        if (!updatedImage) return

        cache.writeQuery<ReadImageQuery, ReadImageQueryVariables>({
          data: {
            readImage: updatedImage,
          },
          query: ReadImageDocument,
          variables: {
            filename,
            repo,
            username,
          },
        })
      },
    }
  )
}
