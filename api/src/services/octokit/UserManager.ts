import axios from 'axios'
import { Github } from './Base'

const GITHUB_ACCESS_TOKEN_LINK = process.env.GITHUB_ACCESS_TOKEN_LINK as string
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URL = process.env.REDIRECT_URL
const STATE = process.env.STATE

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

  public async readUser(username: string) {
    const { data } = await this.octokit.users.getByUsername({
      username,
    })
    return data
  }
}
