import {
  File,
  FileResolvers,
  GithubUser,
  GithubUserResolvers,
  ModelListRepoConnection,
  ModelReadRepoConnection,
  ModelRepoConnection,
  ModelRepoConnectionResolvers,
  MutationCreateRepoArgs,
  MutationDeleteRepoArgs,
  MutationUpdateRepoArgs,
  QueryListReposArgs,
  QueryReadRepoArgs,
  Repo,
  RepoResolvers,
} from '../resolvers-types'
import { github } from '../services/octokit'

export function GithubQueries() {
  return {
    async readGithubUser(): Promise<GithubUser> {
      return github.getUser()
    },
    async readRepo(
      _,
      args: QueryReadRepoArgs
    ): Promise<ModelReadRepoConnection> {
      const files = await github.getRepo(args.username, args.name)
      return {
        items: files,
      }
    },
    async readRepo(
      _,
      args: QueryReadRepoArgs
    ): Promise<ModelReadRepoConnection> {
      const files = await github.getRepo(args.username, args.name)
      return {
        items: files,
      }
    },
    async listRepos(
      _,
      args: QueryListReposArgs
    ): Promise<ModelListRepoConnection> {
      const repos = await github.listRepos(args.username)
      return {
        items: repos,
      }
    },
  }
}

export function GithubMutations() {
  return {
    async createRepo(_, { input }: MutationCreateRepoArgs): Promise<Repo> {
      return github.createRepo(input.name, input.description)
    },
    async updateRepo(_, { input }: MutationUpdateRepoArgs): Promise<Repo> {},
    async deleteRepo(_, { input }: MutationDeleteRepoArgs): Promise<Repo> {},
  }
}
