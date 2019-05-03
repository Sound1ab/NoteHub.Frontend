import axios from 'axios'
import { Github } from './Base'

const GITHUB_ACCESS_TOKEN_LINK = process.env.GITHUB_ACCESS_TOKEN_LINK as string
const CLIENT_SECRET = process.env.CLIENT_SECRET
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL
const STATE = process.env.REACT_APP_STATE

export class UserManager extends Github {
  public async readGithubUserAccessToken(code: string) {
    const { data } = await axios.post(GITHUB_ACCESS_TOKEN_LINK, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URL,
      state: STATE,
    })
    return data
  }

  public async readUser() {
    const { data } = await this.octokit.users.getAuthenticated()
    return data
  }
}
