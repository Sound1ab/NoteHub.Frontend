import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  LogoutQuery,
  LogoutQueryVariables,
} from '../../components/apollo/generated_components_typings'

export const LogoutDocument = gql`
  query Logout {
    logout
  }
`

export function useLogout() {
  return useLazyQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument)
}
