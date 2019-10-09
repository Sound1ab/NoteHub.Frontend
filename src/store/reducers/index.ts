import { IState } from '../store'
import { repoReducer } from './repoReducer'
import { toolbarReducer } from './toolbarReducer'
import { userReducer } from './userReducer'

export const combinedReducers = ({ repo, user, toolbar }: IState, action: any) => ({
  repo: repoReducer(repo, action),
  toolbar: toolbarReducer(toolbar, action),
  user: userReducer(user, action),
})
