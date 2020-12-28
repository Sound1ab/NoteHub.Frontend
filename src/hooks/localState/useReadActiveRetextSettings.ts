import { gql, useQuery } from '@apollo/client'

import {
  ReadActiveRetextSettingsQuery,
  ReadActiveRetextSettingsQueryVariables,
} from '../../components/apollo/generated_components_typings'

export const ReadActiveRetextSettings = gql`
  query ReadActiveRetextSettings {
    activeRetextSettings @client
  }
`

export const useReadActiveRetextSettings = () => {
  const { data } = useQuery<
    ReadActiveRetextSettingsQuery,
    ReadActiveRetextSettingsQueryVariables
  >(ReadActiveRetextSettings)

  return { activeRetextSettings: data?.activeRetextSettings }
}
