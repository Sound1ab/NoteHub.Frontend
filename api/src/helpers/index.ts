import fs from 'fs'
import { EntitySchema, getConnection, ObjectType, Repository } from 'typeorm'

export async function configureRepository<S, T>(
  entity: ObjectType<S> | EntitySchema<S> | string,
  fn: (repository: Repository<S>, args: T) => any
) {
  try {
    const repository = await getConnection().getRepository(entity)
    return (_: any, args: T) => {
      return fn(repository, args)
    }
  } catch (e) {
    console.log(e.message)
  }
}
