import { setContext } from '@apollo/client/link/context'

import { localState } from '../../components/providers/ApolloProvider/cache'

export const context = () =>
  setContext((_, { headers }) => {
    // Doesn't need to use useReactiveVar hook as we're not rerendering
    const jwt = localState.currentJwtVar()

    return {
      headers: {
        ...headers,
        Authorization: jwt ? `Bearer ${jwt}` : '',
      },
    }
  })
