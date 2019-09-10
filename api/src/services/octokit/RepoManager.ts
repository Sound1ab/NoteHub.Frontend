import Octokit from '@octokit/rest'
import { Repo } from '../../resolvers-types'
import { Github } from './Base'

export class RepoManager extends Github {
  public async readRepo(owner: string, repo: string): Promise<Repo> {
    const { data } = await this.octokit.repos.get({
      owner,
      repo: `${this.repoNamespace}${repo}`,
    })
    return this.formatRepoResult(data)
  }

  public async listRepos(username: string): Promise<Repo[]> {
    let result
    try {
      const { data } = await this.octokit.repos.listForUser({
        username,
      })
      result = data
    } catch (error) {
      if (error.message === 'Bad credentials') {
        throw error
      }
      result = []
    }
    return result
      .filter((repo: Octokit.AnyResponse['data']) =>
        repo.name.includes(this.repoNamespace)
      )
      .map((repo: Octokit.AnyResponse['data']) => this.formatRepoResult(repo))
  }

  public async createRepo(
    name: string,
    description?: string | null
  ): Promise<Repo> {
    const { data } = await this.octokit.repos.createForAuthenticatedUser({
      description: description || '',
      name: `${this.repoNamespace}${name}`,
    })
    return this.formatRepoResult(data)
  }

  public async updateRepo(
    owner: string,
    repo: string,
    updatedName?: string | null,
    updatedDescription?: string | null
  ): Promise<Repo> {
    const {description, name} = await this.readRepo(owner, repo)
    const { data } = await this.octokit.repos.update({
      description: updatedDescription || description || '',
      name: updatedName || name || '',
      owner,
      repo: `${this.repoNamespace}${repo}`,
    })
    return this.formatRepoResult(data)
  }

  public async deleteRepo(owner: string, repo: string): Promise<Repo> {
    const originalRepo = await this.readRepo(owner, repo)
    await this.octokit.repos.delete({
      owner,
      repo: `${this.repoNamespace}${repo}`,
    })
    return originalRepo
  }

  private formatRepoResult(
    repo:
      | Octokit.ReposUpdateResponse
      | Octokit.ReposCreateForAuthenticatedUserResponse
  ): Repo {
    return {
      ...repo,
      name: this.removeNamespace(repo.name),
    }
  }

  private removeNamespace(str: string) {
    return str.replace(new RegExp(this.repoNamespace, 'gi'), '')
  }
}
