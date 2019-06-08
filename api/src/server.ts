import { ApolloServer as ApolloServerExpress } from 'apollo-server-express'
import { ApolloServer as ApolloServerLambda } from 'apollo-server-lambda'
import bodyParser from 'body-parser'
import express from 'express'
import { GraphQLFormattedError } from 'graphql'
import { ERRORS } from './errors'
import { FileMutations, FileQueries } from './resolvers/file'
import { ImageMutations, ImageQueries } from './resolvers/image'
import { RepoMutations, RepoQueries } from './resolvers/repo'
import { UserQueries } from './resolvers/user'
import { generateTypedefs } from './schema'
import { FileManager, RepoManager, UserManager } from './services/octokit'

const isDev = process.env.NODE_ENV === 'development'
const port = process.env.PORT || 8088

function initManagers(token: string) {
  const fileManager = new FileManager(token)
  const repoManager = new RepoManager(token)
  const userManager = new UserManager(token)

  return { fileManager, repoManager, userManager }
}

const expressContext = ({ req }: any) => {
  const token = req.headers.authorization
  const isAccessTokenRequest =
    req.body.operationName === 'ReadGithubUserAccessToken'

  if (!token && !isAccessTokenRequest) {
    throw ERRORS.AUTHENTICATION_ERROR
  }

  return initManagers(token)
}

const lambdaContext = ({ event, context }: any) => {
  const token = event.headers.Authorization

  return {
    ...context,
    ...initManagers(token),
    event,
    headers: event.headers,
  }
}

function configureServer() {
  const ApolloServer = isDev ? ApolloServerExpress : ApolloServerLambda

  const resolvers = {
    Mutation: {
      ...RepoMutations(),
      ...FileMutations(),
      ...ImageMutations(),
    },
    Query: {
      ...UserQueries(),
      ...RepoQueries(),
      ...FileQueries(),
      ...ImageQueries(),
    },
  }

  return new ApolloServer({
    context: isDev ? expressContext : lambdaContext,
    formatError: (error: Error): GraphQLFormattedError => {
      const githubAuthError = error.message === 'Bad credentials'

      const formattedError = githubAuthError
        ? ERRORS.AUTHENTICATION_ERROR
        : error

      return formattedError as GraphQLFormattedError
    },
    resolvers,
    typeDefs: generateTypedefs(),
  })
}

export const server = configureServer()

if (isDev) {
  const app = express()

  app.set('env', process.env.APP_ENV)

  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

  server.applyMiddleware({ app })

  try {
    app.listen({ port }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
      )
    )
  } catch (e) {
    console.error(`There was an error bootstraping server: ${e.message}`)
  }
}
