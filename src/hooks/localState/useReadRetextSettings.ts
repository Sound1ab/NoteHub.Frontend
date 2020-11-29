import { useReactiveVar } from '@apollo/client'

import { localState } from '../../components/providers/ApolloProvider/cache'

export const useReadRetextSettings = () =>
  useReactiveVar(localState.retextSettingsVar)
