import { useLazyQuery, gql } from '@apollo/client'

import { LogoutQuery, LogoutQueryVariables } from '../../components/apollo'

export const LogoutDocument = gql`
  query Logout {
    logout
  }
`

export function useLogout() {
  return useLazyQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument)
}
