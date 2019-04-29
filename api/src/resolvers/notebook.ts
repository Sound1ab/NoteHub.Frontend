import { getConnection } from 'typeorm'
import { Notebook } from '../entities/Notebook'
import { User } from '../entities/User'
import { configureRepository, formatResult } from '../helpers'
import {
  MutationCreateNotebookArgs,
  MutationDeleteNotebookArgs,
  MutationUpdateNotebookArgs,
  QueryListNotebooksArgs,
  QueryReadNotebookArgs,
} from '../resolvers-types'

export async function NotebookQueries() {
  return {
    listNotebooks: await configureRepository<Notebook, QueryListNotebooksArgs>(
      Notebook,
      async repository => {
        const results = await repository.find({
          relations: ['notes', 'user'],
        })
        return {
          items: results.map(formatResult),
          nextToken: '1234',
        }
      }
    ),
    readNotebook: await configureRepository<Notebook, QueryReadNotebookArgs>(
      Notebook,
      async (repository, { id }) => {
        return formatResult(
          await repository.findOne({
            relations: ['notes', 'user'],
            where: { id },
          })
        )
      }
    ),
  }
}

export async function NotebookMutations() {
  return {
    createNotebook: await configureRepository<
      Notebook,
      MutationCreateNotebookArgs
    >(Notebook, async (repository, { input: { title, userId } }) => {
      const userRepository = await getConnection().getRepository(User)
      const user = await userRepository.findOne(userId)
      if (!user) return null

      const notebook = new Notebook()
      notebook.title = title
      notebook.user = user

      return formatResult(await repository.save(notebook))
    }),
    deleteNotebook: await configureRepository<
      Notebook,
      MutationDeleteNotebookArgs
    >(Notebook, async (repository, { input: { id } }) => {
      if (!id) return null
      const notebook = await repository.findOne(id)
      if (!notebook) return null
      await repository.remove(notebook)

      return formatResult(notebook)
    }),
    updateNotebook: await configureRepository<
      Notebook,
      MutationUpdateNotebookArgs
    >(Notebook, async (repository, { input: { id, title } }) => {
      const notebook = await repository.findOne(id)
      if (!notebook) return null
      notebook.title = title || notebook.title

      return formatResult(await repository.save(notebook))
    }),
  }
}
