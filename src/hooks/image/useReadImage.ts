import { useQuery, gql } from '@apollo/client'

import {
  ReadImageQuery,
  ReadImageQueryVariables,
} from '../../components/apollo'
import { FileFragment } from '../../fragments'

export const ReadImageDocument = gql`
  ${FileFragment}
  query ReadImage($path: String!) {
    readImage(path: $path) {
      ...file
    }
  }
`

export function useReadImage(path: string) {
  const { data, loading } = useQuery<ReadImageQuery, ReadImageQueryVariables>(
    ReadImageDocument,
    {
      skip: !path,
      variables: {
        path,
      },
    }
  )

  return { file: data?.readImage, loading }
}
