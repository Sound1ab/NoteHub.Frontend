import { User } from '../entities/Todo'
import { configureRepository } from '../helpers'

interface IReadTodo {
  id: number
}

interface ICreateTodo {
  input: {
    description?: string
  }
}

interface IUpdateTodo {
  input: {
    id: number
    description?: string
    isDone?: boolean
  }
}

interface IDeleteTodo {
  input: {
    id: number
  }
}

function parseDate(date: string) {
  const jsDate = new Date(date)
  const splitDate = jsDate.toDateString().split(' ')

  return {
    dateLongForm: jsDate.toISOString(),
    dayOfMonth: splitDate[2],
    dayOfWeek: splitDate[0],
    month: splitDate[1],
  }
}

function formatResult(todo: User | undefined) {
  if (!todo) return null
  return {
    ...todo,
    createdAt: parseDate(todo.createdAt),
    updatedAt: parseDate(todo.updatedAt),
  }
}

export async function TodoQueries() {
  return {
    listTodos: await configureRepository<User, {}>(User, async repository => {
      const results = await repository.find()
      return {
        items: results.map(formatResult),
        nextToken: '1234',
      }
    }),
    readTodo: await configureRepository<User, IReadTodo>(
      User,
      async (repository, { id }) => {
        return formatResult(await repository.findOne(id))
      }
    ),
  }
}

export async function TodoMutations() {
  return {
    createTodo: await configureRepository<User, ICreateTodo>(
      User,
      async (repository, { input: { description = '' } }) => {
        const todo = new User()
        todo.description = description
        todo.isDone = false

        return formatResult(await repository.save(todo))
      }
    ),
    deleteTodo: await configureRepository<User, IDeleteTodo>(
      User,
      async (repository, { input: { id } }) => {
        const todo = await repository.findOne(id)
        await repository.delete(id)

        return formatResult(todo)
      }
    ),
    updateTodo: await configureRepository<User, IUpdateTodo>(
      User,
      async (repository, { input: { id, description, isDone } }) => {
        const todo = await repository.findOne(id)
        if (!todo) return null
        todo.description = description || todo.description
        todo.isDone = isDone === undefined ? todo.isDone : isDone

        return formatResult(await repository.save(todo))
      }
    ),
  }
}
