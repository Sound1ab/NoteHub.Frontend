import { gql, useQuery } from '@apollo/client'

import {
  ReadActiveRetextSettingsQuery,
  ReadActiveRetextSettingsQueryVariables,
} from '../../components/apollo'

export const ReadActiveRetextSettings = gql`
  query ReadActiveRetextSettings {
    activeRetextSettings @client(always: true)
  }
`

export const useReadActiveRetextSettings = () => {
  const { data } = useQuery<
    ReadActiveRetextSettingsQuery,
    ReadActiveRetextSettingsQueryVariables
  >(ReadActiveRetextSettings)

  return { activeRetextSettings: data?.activeRetextSettings }
}
