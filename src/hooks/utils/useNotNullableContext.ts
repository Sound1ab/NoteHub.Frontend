import { Context, useContext } from 'react'

type NotNullableContextValue<T> = T extends Context<infer V>
  ? NonNullable<V>
  : never

// eslint-disable-next-line
export function useNotNullableContext<T extends Context<any>>(
  context: T
): NotNullableContextValue<T> {
  const contextValue = useContext(context)

  if (contextValue === null) {
    throw new Error('Context was null')
  }

  return contextValue
}
