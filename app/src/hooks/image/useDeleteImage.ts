import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import {
  DeleteImageMutation,
  DeleteImageMutationVariables,
  ListImagesDocument,
  ListImagesQuery,
  ListImagesQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'

export const DeleteImageDocument = gql`
  ${FileFragment}
  mutation DeleteImage($input: DeleteFileInput!) {
    deleteImage(input: $input) {
      ...file
    }
  }
`

export function useDeleteImage(username: string, repo: string) {
  return useMutation<DeleteImageMutation, DeleteImageMutationVariables>(
    DeleteImageDocument,
    {
      update: (cache, { data }) => {
        const deletedImage = data && data.deleteImage
        if (!deletedImage) return

        const result = cache.readQuery<
          ListImagesQuery,
          ListImagesQueryVariables
        >({
          query: ListImagesDocument,
          variables: {
            repo,
            username,
          },
        })

        const files =
          (result && result.listImages && result.listImages.items) || []
        const listImages = result && result.listImages

        cache.writeQuery<ListImagesQuery, ListImagesQueryVariables>({
          data: {
            listImages: {
              ...listImages,
              items: files.filter(
                file => file && file.filename !== deletedImage.filename
              ),
            },
          },
          query: ListImagesDocument,
          variables: {
            repo,
            username,
          },
        })
      },
    }
  )
}
