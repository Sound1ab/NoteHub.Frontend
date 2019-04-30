import React, { Dispatch, ReducerAction, useContext } from 'react'
import { IState, NoteContext } from '../store'
import { TNotebookActions } from '../store/actions/notebookAction'

export function useStore() {
  return useContext<
    [IState, Dispatch<ReducerAction<React.Reducer<IState, TNotebookActions>>>]
  >(NoteContext)
}
