import { IState } from '../store'
import { notebookReducer } from './notebookReducer'
import { userReducer } from './userReducer'

export const combinedReducers = ({ notebook, user }: IState, action: any) => ({
  notebook: notebookReducer(notebook, action),
  user: userReducer(user, action),
})
