import { useQuery, gql } from '@apollo/client'

import { LoginQuery, LoginQueryVariables } from '../../components/apollo'

export const LoginDocument = gql`
  query Login {
    login
  }
`

export function useLogin() {
  const { data, loading } = useQuery<LoginQuery, LoginQueryVariables>(
    LoginDocument
  )

  return { jwt: data?.login, loading }
}
