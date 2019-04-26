import React, { Dispatch, ReducerAction } from 'react'
import { INotepad } from '../interfaces'
import { TNotepadActions } from './actions/notepadAction'

export interface IState {
  activeNote: string
  activeNotepad: string
  allNotepads: INotepad[]
}

export const initialState: IState = {
  activeNote: '',
  activeNotepad: '',
  allNotepads: []
}

export const NoteContext = React.createContext<[IState, Dispatch<ReducerAction<React.Reducer<IState, TNotepadActions>>> | null]>([initialState, null])