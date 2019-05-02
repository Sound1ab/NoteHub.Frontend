import React, { Dispatch, ReducerAction } from 'react'
import { TNotebookActions } from './actions/notebookAction'
import { TUserActions } from './actions/userAction'
import { initialNotebookState } from './reducers/notebookReducer'
import { initialUserState } from './reducers/userReducer'

export type IState = typeof initialState
export type TActions = TNotebookActions & TUserActions

export const initialState = {
  notebook: initialNotebookState,
  user: initialUserState,
}

export const NoteContext = React.createContext<
  [IState, Dispatch<ReducerAction<React.Reducer<IState, TActions>>>]
>([initialState, () => null])
