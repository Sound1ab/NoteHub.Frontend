import {
  EntitySchema,
  getConnection,
  ObjectType,
  Repository,
  SelectQueryBuilder,
} from 'typeorm'

export function calculateNextOffset(
  offset?: number | null,
  limit?: number | null
) {
  return typeof offset === 'number' && typeof limit === 'number'
    ? offset + limit
    : null
}

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

type Maybe<T> = T | null

function createFilter<T>(
  filterKey: string | Array<Maybe<string>>,
  value: string | Array<Maybe<string>>,
  query: SelectQueryBuilder<T>
) {
  switch (filterKey) {
    case 'ne':
      return (table: string, column: string) =>
        query.where(`${table}.${column} != :${column}`, { [column]: value })
    case 'eq':
      return (table: string, column: string) =>
        query.where(`${table}.${column} = :${column}`, { [column]: value })
    case 'le':
      return (table: string, column: string) =>
        query.where(`${table}.${column} <= :${column}`, { [column]: value })
    case 'lt':
      return (table: string, column: string) =>
        query.where(`${table}.${column} < :${column}`, { [column]: value })
    case 'ge':
      return (table: string, column: string) =>
        query.where(`${table}.${column} >= :${column}`, { [column]: value })
    case 'gt':
      return (table: string, column: string) =>
        query.where(`${table}.${column} > :${column}`, { [column]: value })
    case 'contains':
      return (table: string, column: string) =>
        query.where(`${table}.${column} LIKE :${column}`, {
          [column]: `%${value}%`,
        })
    case 'notContains':
      return (table: string, column: string) =>
        query.where(`${table}.${column} NOT LIKE :${column}`, {
          [column]: `%${value}%`,
        })
    default:
      throw new Error()
  }
}

function extractFilterKeyAndValue<T>(
  filters: T
): Array<Extract<keyof T, string> | T[Extract<keyof T, string>]> | undefined {
  const populatedFilters = Object.entries(filters).filter(entry => {
    const [, value] = entry
    return !!value
  })

  if (populatedFilters.length > 1) {
    throw new Error("You're only allowed one filter per value")
  } else if (populatedFilters.length === 0) {
    throw new Error('No value provided to filter on')
  }

  return populatedFilters[0]
}

// const [filterKey, filterValue] = extractFilterKeyAndValue<
//   ModelStringFilterInput
//   >(filter.userId)
//
// console.log('filterKey, filterValue', filterKey, filterValue)
//
// if (!filterKey || !filterValue) return
//
// query = createFilter<Notebook>(filterKey, filterValue, query)(
//   'user',
//   'id'
// )
