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
      { input: { username, repo, name, markdown } }: MutationCreateFileArgs,
      { fileManager }: { fileManager: FileManager }
    ): Promise<File> {
      return fileManager.createFile(username, repo, name, markdown)
    },
    async updateFile(
      _,
      { input: { markdown, name, repo, username } }: MutationUpdateFileArgs,
      { fileManager }: { fileManager: FileManager }
    ): Promise<File> {
      return fileManager.updateFile(username, repo, name, markdown)
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
