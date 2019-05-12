import { Dispatch, Reducer, ReducerAction, useContext } from 'react'
import { IState, NoteContext, TActions } from '../store'

export function useStore() {
  return useContext<
    [IState, Dispatch<ReducerAction<Reducer<IState, TActions>>>]
  >(NoteContext)
}
