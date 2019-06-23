import { Dispatch, Reducer, ReducerAction, useContext } from 'react'
import { FileContext, IState, TActions } from '../store'

export function useStore() {
  return useContext<
    [IState, Dispatch<ReducerAction<Reducer<IState, TActions>>>]
  >(FileContext)
}
