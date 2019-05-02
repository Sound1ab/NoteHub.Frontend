import React, { Dispatch, ReducerAction, useContext } from 'react'
import { IState, NoteContext, TActions } from '../store'

export function useStore() {
  return useContext<
    [IState, Dispatch<ReducerAction<React.Reducer<IState, TActions>>>]
  >(NoteContext)
}
