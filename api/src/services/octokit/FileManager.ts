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
    return {
      ...data,
      content: Github.decodeFromBase64(data.content),
      filename: data.name,
    }
  }

  public async listFiles(owner: string, repo: string): Promise<File[]> {
    const { data } = await this.octokit.repos.getContents({
      owner,
      path: '/',
      repo: `${this.repoNamespace}${repo}`,
    })
    return data.map((file: Octokit.AnyResponse['data']) => ({
      ...file,
      filename: file.name,
    }))
  }

  public async createFile(
    owner: string,
    repo: string,
    name: string,
    content?: string | null
  ): Promise<File> {
    await this.octokit.repos.createFile({
      content: content ? Github.encodeToBase64(content) : '',
      message: Github.formCommitMessage(name, 'create'),
      owner,
      path: `${name}`,
      repo: `${this.repoNamespace}${repo}`,
    })
    return this.readFile(owner, repo, name)
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
    await this.octokit.repos.updateFile({
      content:
        (content && Github.encodeToBase64(content)) || (originalContent || ''),
      message: Github.formCommitMessage(name, 'update'),
      owner,
      path: `${name}`,
      repo: `${this.repoNamespace}${repo}`,
      sha,
    })
    return this.readFile(owner, repo, name)
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
}
