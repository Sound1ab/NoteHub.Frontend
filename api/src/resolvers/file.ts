import {
  File,
  ModelFileConnection,
  MutationCreateFileArgs,
  MutationDeleteFileArgs,
  MutationUpdateFileArgs,
  QueryListFilesArgs,
  QueryReadFileArgs,
} from '../resolvers-types'
import { FileManager } from '../services/octokit'

export function FileQueries() {
  return {
    async readFile(
      _,
      { file, repo, username }: QueryReadFileArgs,
      { fileManager }: { fileManager: FileManager }
    ): Promise<File> {
      return fileManager.readFile(username, repo, file)
    },
    async listFiles(
      _,
      { repo, username }: QueryListFilesArgs,
      { fileManager }: { fileManager: FileManager }
    ): Promise<ModelFileConnection> {
      const files = await fileManager.listFiles(username, repo)
      return {
        items: files,
      }
    },
  }
}

export function FileMutations() {
  return {
    async createFile(
      _,
      { input: { username, repo, name, content } }: MutationCreateFileArgs,
      { fileManager }: { fileManager: FileManager }
    ): Promise<File> {
      return fileManager.createFile(username, repo, name, content)
    },
    async updateFile(
      _,
      { input: { content, name, repo, username } }: MutationUpdateFileArgs,
      { fileManager }: { fileManager: FileManager }
    ): Promise<File> {
      return fileManager.updateFile(username, repo, name, content)
    },
    async deleteFile(
      _,
      { input: { name, repo, username } }: MutationDeleteFileArgs,
      { fileManager }: { fileManager: FileManager }
    ): Promise<File> {
      return fileManager.deleteFile(username, repo, name)
    },
  }
}
