import { History, Location } from 'history'
import { withRouter } from 'react-router-dom'

import { LOCAL_STORAGE } from '../../../enums'
import { useReadGithubUserAccessToken, writeStorage } from '../../../hooks'

interface ICallback {
  location: Location
  history: History
}

export const Callback = withRouter(({ location, history }: ICallback) => {
  const params = new URLSearchParams(location.search)
  const code = params.get('code')
  const state = params.get('state')

  const accessToken = useReadGithubUserAccessToken(code, state)

  if (accessToken) {
    writeStorage(LOCAL_STORAGE.KEY, accessToken)
    history.push('/dashboard')
  }

  return null
})
