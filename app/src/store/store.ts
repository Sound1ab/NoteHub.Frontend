import React, { Dispatch, ReducerAction } from 'react'
import { INote, INotepad } from '../interfaces'
import { TNotepadActions } from './actions/notepadAction'

export interface IState {
  activeNote: INote | null
  activeNotepad: INotepad | null
  allNotepads: INotepad[]
}

export const initialState: IState = {
  activeNote: null,
  activeNotepad: null,
  allNotepads: [],
}

export const NoteContext = React.createContext<
  [
    IState,
    Dispatch<ReducerAction<React.Reducer<IState, TNotepadActions>>> | null
  ]
>([initialState, null])
