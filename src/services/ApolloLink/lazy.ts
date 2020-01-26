import { ApolloLink, Observable, fromPromise, toPromise } from 'apollo-link'

type Lazy = (
  factory: () => Promise<ApolloLink | { default: ApolloLink }>
) => ApolloLink

export const lazy: Lazy = factory =>
  new ApolloLink((operation, forward) =>
    fromPromise(
      factory().then(resolved => {
        const link =
          resolved instanceof ApolloLink ? resolved : resolved.default
        return toPromise(link.request(operation, forward) || Observable.of())
      })
    )
  )
