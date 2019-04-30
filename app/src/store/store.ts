import React, { Dispatch, ReducerAction } from 'react'
import { TNotebookActions } from './actions/notebookAction'

export interface IState {
  activeNote: string | null
  activeNotebook: string | null
}

export const initialState: IState = {
  activeNote: null,
  activeNotebook: null,
}

export const NoteContext = React.createContext<
  [IState, Dispatch<ReducerAction<React.Reducer<IState, TNotebookActions>>>]
>([initialState, () => null])
