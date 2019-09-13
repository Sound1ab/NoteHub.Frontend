import { onError } from 'apollo-link-error'
import { APOLLO_ERRORS, LOCAL_STORAGE } from '../../../enums'
import { deleteFromStorage } from '../../../hooks'

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (!err || !err.extensions) {
        return
      }
      switch (err.extensions.code) {
        case APOLLO_ERRORS.UNAUTHENTICATED:
          deleteFromStorage(LOCAL_STORAGE.KEY)
          break
        default:
          return
      }
    }
  }

  if (networkError) console.log(`[Network error]: ${networkError}`)
})
