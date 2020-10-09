import { setContext } from '@apollo/client/link/context'

import { currentJwtVar } from '../../components/providers/ApolloProvider/cache'

export const context = () =>
  setContext((_, { headers }) => {
    // Doesn't need to use hook as we're not rerendering
    const jwt = currentJwtVar()

    return {
      headers: {
        ...headers,
        Authorization: jwt ? `Bearer ${jwt}` : '',
      },
    }
  })
