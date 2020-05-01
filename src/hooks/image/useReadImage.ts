import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ReadImageQuery,
  ReadImageQueryVariables,
} from '../../components/apollo/generated_components_typings'
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
