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
      path: name,
      repo: `${this.repoNamespace}${repo}`,
    })
    const content = Github.decodeFromBase64(data.content)
    return {
      ...data,
      content,
      excerpt: `${content.substring(0, 50)}...`,
      filename: data.name,
    }
  }

  public async listFiles(
    owner: string,
    repo: string,
    path: string = '/'
  ): Promise<File[]> {

    try {
      const { data } = await this.octokit.repos.getContents({
        owner,
        path,
        repo: `${this.repoNamespace}${repo}`,
      })
      // Files have been previously added but all have been deleted
      if (data.length === 0) {
        const file = await this.createFile(owner, repo, 'my note.md', '')
        return [file]
      }
      return data.map((file: Octokit.AnyResponse['data']) => ({
        ...file,
        filename: file.name,
      }))
    } catch (error) {
      // First time creating a repo a no new files have been added before
      if (error.message === 'This repository is empty.') {
        console.log('here')
        const file = await this.createFile(owner, repo, 'my note.md', '')
        return [file]
      }
      if (
        error.message === 'Not Found' ||
        error.message === 'Bad credentials'
      ) {
        throw error
      }
      return []
    }

  }

  public async createFile(
    owner: string,
    repo: string,
    name: string,
    content?: string | null
  ): Promise<File> {
    try {
      await this.octokit.repos.createFile({
        content: content ? Github.encodeToBase64(content) : '',
        message: Github.formCommitMessage(name, 'create'),
        owner,
        path: name,
        repo: `${this.repoNamespace}${repo}`,
      })
    } catch (error) {
      if (!error.message.includes('"sha" wasn\'t supplied')) {
        throw error
      }
    }
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
