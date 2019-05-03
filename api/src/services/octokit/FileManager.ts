import Octokit from '@octokit/rest'
import { File } from '../../resolvers-types'
import { Github } from './Base'

export class FileManager extends Github {
  public async readFile(
    owner: string,
    repo: string,
    name: string
  ): Promise<File> {
    const { data } = await this.octokit.repos.getContents({
      owner,
      path: `${name}`,
      repo: `${this.repoNamespace}${repo}`,
    })
    return this.formatFileResult(data)
  }

  public async listFiles(owner: string, repo: string): Promise<File> {
    const { data } = await this.octokit.repos.getContents({
      owner,
      path: '/',
      repo: `${this.repoNamespace}${repo}`,
    })
    return data.map((file: Octokit.ReposCreateFileResponse['content']) =>
      this.formatFileResult(file)
    )
  }

  public async createFile(
    owner: string,
    repo: string,
    name: string,
    content?: string | null
  ): Promise<File> {
    const { data } = await this.octokit.repos.createFile({
      content: content ? Github.encodeToBase64(content) : '',
      message: Github.formCommitMessage(name, 'create'),
      owner,
      path: `${name}`,
      repo: `${this.repoNamespace}${repo}`,
    })
    return this.formatFileResult(data.content)
  }

  public async updateFile(
    owner: string,
    repo: string,
    name: string,
    content?: string | null
  ): Promise<File> {
    const { sha, content: originalContent } = await this.readFile(
      owner,
      repo,
      name
    )
    const { data } = await this.octokit.repos.updateFile({
      content:
        (content && Github.encodeToBase64(content)) || (originalContent || ''),
      message: Github.formCommitMessage(name, 'update'),
      owner,
      path: `${name}`,
      repo: `${this.repoNamespace}${repo}`,
      sha,
    })
    return this.formatFileResult(data.content)
  }

  public async deleteFile(
    owner: string,
    repo: string,
    name: string
  ): Promise<File> {
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

  private formatFileResult(
    file: Octokit.ReposCreateFileResponse['content']
  ): File {
    return {
      ...file,
      id: file.sha,
    }
  }
}
