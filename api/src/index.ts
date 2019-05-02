import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { config } from './config'
import { DateType } from './resolvers/date'
import { FileMutations, FileQueries } from './resolvers/file'
import { NoteMutations, NoteQueries } from './resolvers/note'
import { NotebookMutations, NotebookQueries } from './resolvers/notebook'
import { RepoMutations, RepoQueries } from './resolvers/repo'
import { UserMutations, UserQueries } from './resolvers/user'
import { typeDefs } from './schema'
import { FileManager, RepoManager } from './services/octokit'

const port = process.env.PORT || 8088

async function configureServer() {
  const app = express()

  app.set('env', process.env.APP_ENV)

  const resolvers = {
    Date: DateType,
    Mutation: {
      ...(await UserMutations()),
      ...(await NoteMutations()),
      ...(await NotebookMutations()),
      ...RepoMutations(),
      ...FileMutations(),
    },
    Query: {
      ...(await UserQueries()),
      ...(await NoteQueries()),
      ...(await NotebookQueries()),
      ...RepoQueries(),
      ...FileQueries(),
    },
  }

  const server = new ApolloServer({
    context: ({ req }) => {
      const token = req.headers.authorization || ''
      const fileManager = new FileManager(token)
      const repoManager = new RepoManager(token)
      return { fileManager, repoManager }
    },
    resolvers,
    typeDefs,
  })

  server.applyMiddleware({ app })
  return { server, app }
}

;(async function bootstrapServer() {
  try {
    await createConnection(config as any)
    const { server, app } = await configureServer()

    app.listen({ port }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
      )
    )
  } catch (e) {
    console.error(`There was an error bootstraping server: ${e.message}`)
  }
})()
