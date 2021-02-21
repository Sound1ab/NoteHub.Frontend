import { gql, useQuery } from '@apollo/client'

import {
  ReadConfigurationQuery,
  ReadConfigurationQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { ConfigurationFragment } from '../../fragments'

export const ReadConfigurationDocument = gql`
  ${ConfigurationFragment}
  query ReadConfiguration {
    readConfiguration {
      ...configuration
    }
  }
`

export function useReadConfiguration() {
  const { data, loading } = useQuery<
    ReadConfigurationQuery,
    ReadConfigurationQueryVariables
  >(ReadConfigurationDocument)

  return { configuration: data?.readConfiguration, loading }
}
