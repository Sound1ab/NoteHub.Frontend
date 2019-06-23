import React, { Dispatch, ReducerAction } from 'react'
import { TRepoActions } from './actions/repoAction'
import { TUserActions } from './actions/userAction'
import { initialRepoState } from './reducers/repoReducer'
import { initialUserState } from './reducers/userReducer'

export const initialState = {
  repo: initialRepoState,
  user: initialUserState,
}

export type IState = typeof initialState
export type TActions = TRepoActions | TUserActions

export const FileContext = React.createContext<
  [IState, Dispatch<ReducerAction<React.Reducer<IState, TActions>>>]
>([initialState, () => null])
