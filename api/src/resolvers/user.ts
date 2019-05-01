import { User } from '../entities/User'
import { calculateNextOffset, configureRepository } from '../helpers'
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
      async (repository, { filter, limit, offset }) => {
        const query = repository.createQueryBuilder('user')

        if (filter && filter.id) {
          query.where('id = :id', { id: filter.id.eq })
        }

        if (limit) {
          query.take(limit)
        }

        if (offset) {
          query.skip(offset)
        }

        const results = await query.getMany()

        return {
          items: results,
          nextOffset: calculateNextOffset(limit, offset),
        }
      }
    ),
    readUser: await configureRepository<User, QueryReadUserArgs>(
      User,
      async (repository, { id }) => {
        return repository.findOne({
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
        const userCopy = {
          ...user,
        }
        if (!user) return null
        await repository.remove(user)

        return userCopy
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
