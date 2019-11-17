import React, { Dispatch, ReducerAction } from 'react'
import { TToolbarActions } from './actions/toolbarAction'
import { initialToolbarState } from './reducers/toolbarReducer'

export const initialState = {
  toolbar: initialToolbarState,
}

export type IState = typeof initialState
export type TActions = TToolbarActions

export const FileContext = React.createContext<
  [IState, Dispatch<ReducerAction<React.Reducer<IState, TActions>>>]
>([initialState, () => null])
