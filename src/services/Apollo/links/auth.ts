import { ApolloLink, Operation, NextLink } from 'apollo-link'
import { LOCAL_STORAGE } from '../../../enums'
import { LocalStorage } from '../../LocalStorage'

export const authLink = new ApolloLink(
  (operation: Operation, forward?: NextLink) => {
    const token = LocalStorage.getItem(LOCAL_STORAGE.KEY)

    operation.setContext({
      headers: {
        Authorization: token ? `${token}` : '',
      },
    })

    return forward ? forward(operation) : null
  }
)
