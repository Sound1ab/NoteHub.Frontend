import { ApolloServer, IResolvers } from 'apollo-server-express'
import express from 'express'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { config } from './config'
import { UserMutations, UserQueries } from './resolvers/user'
import { typeDefs } from './schema'

const port = process.env.PORT || 8088

async function configureServer() {
  const app = express()

  app.set('env', process.env.APP_ENV)

  const resolvers: IResolvers = {
    Mutation: {
      ...(await UserMutations()),
    },
    Query: {
      ...(await UserQueries()),
    },
  }

  const server = new ApolloServer({
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
