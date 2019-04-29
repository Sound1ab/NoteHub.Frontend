import React, { Dispatch, ReducerAction, useContext } from 'react'
import { IState, NoteContext } from '../store'
import { TNotepadActions } from '../store'

export function useStore() {
  return useContext<
    [IState, Dispatch<ReducerAction<React.Reducer<IState, TNotepadActions>>>]
  >(NoteContext)
}
