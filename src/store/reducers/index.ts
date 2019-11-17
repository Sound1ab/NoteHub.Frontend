import { IState } from '../store'
import { toolbarReducer } from './toolbarReducer'

export const combinedReducers = ({ toolbar }: IState, action: any) => ({
  toolbar: toolbarReducer(toolbar, action),
})
