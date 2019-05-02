import { Github } from './Base'

export class FileManager extends Github {
  public async readUser(username: string) {
    const { data } = await this.octokit.users.getByUsername({
      username,
    })
    return data
  }

  // File
  public async readFile(owner: string, repo: string, name: string) {
    const { data } = await this.octokit.repos.getContents({
      owner,
      path: `${name}`,
      repo: `${this.repoNamespace}${repo}`,
    })
    return data
  }

  public async listFiles(owner: string, repo: string) {
    const { data } = await this.octokit.repos.getContents({
      owner,
      path: '/',
      repo: `${this.repoNamespace}${repo}`,
    })
    return data
  }

  public async createFile(
    owner: string,
    repo: string,
    name: string,
    content?: string | null
  ) {
    const { data } = await this.octokit.repos.createFile({
      content: content ? Github.encodeToBase64(content) : '',
      message: Github.formCommitMessage(name, 'create'),
      owner,
      path: `${name}`,
      repo: `${this.repoNamespace}${repo}`,
    })
    return data.content
  }

  public async updateFile(
    owner: string,
    repo: string,
    name: string,
    content?: string | null
  ) {
    const { sha, content: originalContent } = await this.readFile(
      owner,
      repo,
      name
    )
    const { data } = await this.octokit.repos.updateFile({
      content: content ? Github.encodeToBase64(content) : originalContent,
      message: Github.formCommitMessage(name, 'update'),
      owner,
      path: `${name}`,
      repo: `${this.repoNamespace}${repo}`,
      sha,
    })
    return data.content
  }

  public async deleteFile(owner: string, repo: string, name: string) {
    const file = await this.readFile(owner, repo, name)
    await this.octokit.repos.deleteFile({
      message: Github.formCommitMessage(name, 'delete'),
      owner,
      path: `${name}`,
      repo: `${this.repoNamespace}${repo}`,
      sha: file.sha,
    })
    return file
  }
}
