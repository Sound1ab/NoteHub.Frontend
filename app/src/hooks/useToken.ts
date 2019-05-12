import { Dispatch, Reducer, ReducerAction, useEffect } from 'react'
import { LOCAL_STORAGE } from '../enums'
import { LocalStorage } from '../services/LocalStorage'
import { isAuthorized, IState, TActions } from '../store'

export function useToken(dispatch: Dispatch<ReducerAction<Reducer<IState, TActions>>>) {
  const token = LocalStorage.getItem(LOCAL_STORAGE.KEY)

  useEffect(() => {
    if (token) {
      dispatch(isAuthorized(true))
    }
  }, [token])
}