import { gql, useQuery } from '@apollo/client'

import {
  ReadIsDarkModeQuery,
  ReadIsDarkModeQueryVariables,
} from '../../components/apollo'

export const ReadIsDarkMode = gql`
  query ReadIsDarkMode {
    isDarkMode @client
  }
`

export const useReadIsDarkMode = () => {
  const { data, loading, error } = useQuery<
    ReadIsDarkModeQuery,
    ReadIsDarkModeQueryVariables
  >(ReadIsDarkMode)

  return { isDarkMode: data?.isDarkMode, loading, error }
}
