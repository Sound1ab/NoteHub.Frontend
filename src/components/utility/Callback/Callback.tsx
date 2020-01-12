import { useApolloClient } from '@apollo/react-hooks'
import { History, Location } from 'history'
import { withRouter } from 'react-router-dom'

import { useReadGithubUserAccessToken } from '../../../hooks'

interface ICallback {
  location: Location
  history: History
}

export const Callback = withRouter(({ location, history }: ICallback) => {
  const client = useApolloClient()
  const params = new URLSearchParams(location.search)
  const code = params.get('code')
  const state = params.get('state')

  const response = useReadGithubUserAccessToken(code, state)

  if (response === 'ok') {
    client.writeData({ data: { isAuthorised: true } })
    history.push('/dashboard')
  }

  return null
})
