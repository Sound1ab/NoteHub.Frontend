import React, { Dispatch, ReducerAction, useContext } from 'react'
import {IState, NoteContext} from '../store'
import { TAction } from '../store/actions/notepadAction'

export function useStore() {
  return useContext<[IState, Dispatch<ReducerAction<React.Reducer<IState, TAction>>> | null]>(NoteContext)
}