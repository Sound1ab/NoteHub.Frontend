import {
  ModelRepoConnection,
  MutationCreateRepoArgs,
  MutationDeleteRepoArgs,
  MutationUpdateRepoArgs,
  QueryListReposArgs,
  QueryReadRepoArgs,
  Repo,
} from '../resolvers-types'
import { Github } from '../services/octokit'

export function RepoQueries() {
  return {
    async readRepo(
      _,
      args: QueryReadRepoArgs,
      ctx: { github: Github }
    ): Promise<Repo> {
      return ctx.github.readRepo(args.username, args.repo)
    },
    async listRepos(
      _,
      args: QueryListReposArgs,
      ctx: { github: Github }
    ): Promise<ModelRepoConnection> {
      const repos = await ctx.github.listRepos(args.username)
      return {
        items: repos,
      }
    },
  }
}

export function RepoMutations() {
  return {
    async createRepo(
      _,
      { input }: MutationCreateRepoArgs,
      ctx: { github: Github }
    ): Promise<Repo> {
      return ctx.github.createRepo(input.name, input.description)
    },
    async updateRepo(_, { input }: MutationUpdateRepoArgs): Promise<Repo> {
      const github = new Github(input.token)
      return github.updateRepo(
        input.username,
        input.repo,
        input.name,
        input.description
      )
    },
    async deleteRepo(
      _,
      { input }: MutationDeleteRepoArgs,
      ctx: { github: Github }
    ): Promise<Repo> {
      return ctx.github.deleteRepo(input.username, input.repo)
    },
  }
}
