import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import {
  DeleteImageMutation,
  DeleteImageMutationVariables,
  ListImagesQuery,
  ListImagesQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'
import { ListImagesDocument } from './useListImage'

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

        const files = result?.listImages.items ?? []
        const listImages = result?.listImages

        cache.writeQuery<ListImagesQuery, ListImagesQueryVariables>({
          data: {
            listImages: {
              ...listImages,
              items: files.filter(
                file => file.filename !== deletedImage.filename
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
