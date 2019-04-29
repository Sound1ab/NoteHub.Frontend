import { EntitySchema, getConnection, ObjectType, Repository } from 'typeorm'
import { Base } from '../entities/Base'

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

export function parseDate(date: string) {
  const jsDate = new Date(date)
  const splitDate = jsDate.toDateString().split(' ')

  return {
    dateLongForm: jsDate.toISOString(),
    dayOfMonth: splitDate[2],
    dayOfWeek: splitDate[0],
    month: splitDate[1],
  }
}

export function formatResult<T extends Base>(entity: T | undefined) {
  if (!entity) return null
  return {
    ...entity,
    createdAt: parseDate(entity.createdAt),
    updatedAt: parseDate(entity.updatedAt),
  }
}
