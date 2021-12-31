import React, { useEffect } from 'react'

import { useLogin } from '../../../hooks/authorization/useLogin'
import { useReadJwt } from '../../../hooks/localState/useReadJwt'
import { localState } from '../../providers/ApolloProvider/cache'

export interface IPrivateRoute {
  children: JSX.Element
}

export function PrivateRoute({ children }: IPrivateRoute) {
  const { jwt, loading } = useLogin()
  const savedJwt = useReadJwt()

  useEffect(() => {
    if (!jwt) {
      return
    }

    localState.currentJwtVar(jwt)
  }, [jwt])

  if (loading) {
    return null
  }

  return savedJwt && children ? children : null
}
