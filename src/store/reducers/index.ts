import { IState } from '../store'
import { repoReducer } from './repoReducer'
import { userReducer } from './userReducer'

export const combinedReducers = ({ repo, user }: IState, action: any) => ({
  repo: repoReducer(repo, action),
  user: userReducer(user, action),
})
