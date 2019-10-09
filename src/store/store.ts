import React, { Dispatch, ReducerAction } from 'react'
import { TRepoActions } from './actions/repoAction'
import { TToolbarActions } from './actions/toolbarAction'
import { TUserActions } from './actions/userAction'
import { initialRepoState } from './reducers/repoReducer'
import { initialToolbarState } from './reducers/toolbarReducer'
import { initialUserState } from './reducers/userReducer'

export const initialState = {
  repo: initialRepoState,
  toolbar: initialToolbarState,
  user: initialUserState,
}

export type IState = typeof initialState
export type TActions = TRepoActions | TUserActions | TToolbarActions

export const FileContext = React.createContext<
  [IState, Dispatch<ReducerAction<React.Reducer<IState, TActions>>>]
>([initialState, () => null])
