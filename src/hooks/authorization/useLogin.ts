import { gql, useQuery } from '@apollo/client'

import {
  LoginQuery,
  LoginQueryVariables,
} from '../../components/apollo/generated_components_typings'

export const LoginDocument = gql`
  query Login {
    login
  }
`

export function useLogin() {
  const { data, loading } = useQuery<LoginQuery, LoginQueryVariables>(
    LoginDocument
  )

  console.log('useLogin', data)

  return { jwt: data?.login, loading }
}
