import { User } from '../entities/User'
import { configureRepository } from '../helpers'
import {
  MutationCreateUserArgs,
  MutationDeleteUserArgs,
  MutationUpdateUserArgs,
  QueryListUsersArgs,
  QueryReadUserArgs,
} from '../resolvers-types'

export async function UserQueries() {
  return {
    listUsers: await configureRepository<User, QueryListUsersArgs>(
      User,
      async repository => {
        const results = await repository.find({
          relations: ['notebooks', 'notebooks.notes'],
        })
        return {
          items: results,
          nextToken: '1234',
        }
      }
    ),
    readUser: await configureRepository<User, QueryReadUserArgs>(
      User,
      async (repository, { id }) => {
        return repository.findOne({
          relations: ['notebooks', 'notebooks.notes'],
          where: { id },
        })
      }
    ),
  }
}

export async function UserMutations() {
  return {
    createUser: await configureRepository<User, MutationCreateUserArgs>(
      User,
      async (repository, { input: { firstName, lastName, email } }) => {
        const user = new User()
        user.firstName = firstName
        user.lastName = lastName
        user.email = email

        return repository.save(user)
      }
    ),
    deleteUser: await configureRepository<User, MutationDeleteUserArgs>(
      User,
      async (repository, { input: { id } }) => {
        if (!id) return null
        const user = await repository.findOne(id)
        if (!user) return null

        return repository.remove(user)
      }
    ),
    updateUser: await configureRepository<User, MutationUpdateUserArgs>(
      User,
      async (repository, { input: { id, email, lastName, firstName } }) => {
        const user = await repository.findOne(id)
        if (!user) return null
        user.email = email || user.email
        user.firstName = firstName || user.firstName
        user.lastName = lastName || user.lastName

        return repository.save(user)
      }
    ),
  }
}
