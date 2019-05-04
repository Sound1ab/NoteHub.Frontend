import { onError } from 'apollo-link-error'
import React, { Dispatch, ReducerAction } from 'react'
import { APOLLO_ERRORS, LOCAL_STORAGE } from '../../../enums'
import { IState, reset, TActions } from '../../../store'
import { LocalStorage } from '../../LocalStorage'

export const errorLink = (
  state: IState,
  dispatch: Dispatch<ReducerAction<React.Reducer<IState, TActions>>>
) =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (!err || !err.extensions) {
          return
        }
        switch (err.extensions.code) {
          case APOLLO_ERRORS.UNAUTHENTICATED:
            LocalStorage.removeItem(LOCAL_STORAGE.KEY)
            dispatch(reset())
            break
          default:
            return
        }
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`)
  })
