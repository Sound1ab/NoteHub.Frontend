import Throttle from '@octokit/plugin-throttling'
import Octokit from '@octokit/rest'
import { Repo } from '../../resolvers-types'

const octokitWithThrottle = Octokit.plugin(Throttle)

export class Github {
  private octokit: Octokit
  private repoNamespace = 'noted-app-notes--'

  public constructor(token?: string, log?: boolean) {
    this.octokit = new octokitWithThrottle({
      auth: `token ${token}`,
      log: log ? console : {},
      throttle: {
        onAbuseLimit: (retryAfter: any, options: any) => {
          // does not retry, only logs a warning
          this.octokit.log.warn(
            `Abuse detected for request ${options.method} ${options.url}`
          )
        },
        onRateLimit: (retryAfter: any, options: any) => {
          this.octokit.log.warn(
            `Request quota exhausted for request ${options.method} ${
              options.url
            }`
          )

          if (options.request.retryCount === 0) {
            // only retries once
            console.log(`Retrying after ${retryAfter} seconds!`)
            return true
          }
        },
      },
      userAgent: 'noted-api-v1',
    })
  }

  public async readUser(username: string) {
    const { data } = await this.octokit.users.getByUsername({
      username,
    })
    return data
  }

  public async listFiles(owner: string, repo: string) {
    const { data } = await this.octokit.repos.getContents({
      owner,
      path: '/',
      repo,
    })
    return data
  }

  // Repo
  public async readRepo(owner: string, repo: string) {
    const { data } = await this.octokit.repos.get({
      owner,
      repo: `${this.repoNamespace}${repo}`,
    })
    return this.formatRepoResult(data)
  }

  public async listRepos(username: string) {
    const { data } = await this.octokit.repos.listForUser({
      username,
    })
    return data
      .filter((repo: Repo) => repo.name.includes(this.repoNamespace))
      .map((repo: Repo) => this.formatRepoResult(repo))
  }

  public async createRepo(name: string, description?: string | null) {
    const { data } = await this.octokit.repos.createForAuthenticatedUser({
      description: description || '',
      name: `${this.repoNamespace}${name}`,
    })
    return this.formatRepoResult(data)
  }

  public async updateRepo(
    owner: string,
    repo: string,
    name?: string | null,
    description?: string | null
  ) {
    const originalRepo = await this.readRepo(owner, repo)
    const { data } = await this.octokit.repos.update({
      description: description || originalRepo.description,
      name: name || originalRepo.name,
      owner,
      repo: `${this.repoNamespace}${repo}`,
    })
    return this.formatRepoResult(data)
  }

  public async deleteRepo(owner: string, repo: string) {
    const originalRepo = await this.readRepo(owner, repo)
    await this.octokit.repos.delete({
      owner,
      repo: `${this.repoNamespace}${repo}`,
    })
    return this.formatRepoResult(originalRepo)
  }

  private formatRepoResult(repo: Repo): Repo {
    return {
      ...repo,
      name: this.removeNamespace(repo.name),
    }
  }

  private removeNamespace(str: string) {
    return str.replace(new RegExp(this.repoNamespace, 'gi'), '')
  }
}
