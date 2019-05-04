import { ApolloClient, ApolloLink, InMemoryCache } from 'apollo-boost'
import React, { Dispatch, ReducerAction } from 'react'
import { IState, TActions } from '../../store'
import { authLink, errorLink, httpLink } from './links'

export function createClient(
  state: IState,
  dispatch: Dispatch<ReducerAction<React.Reducer<IState, TActions>>>
) {
  const link = ApolloLink.from([errorLink(state, dispatch), authLink, httpLink])

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  })
}
