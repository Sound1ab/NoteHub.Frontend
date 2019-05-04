import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faSoundcloud } from '@fortawesome/free-brands-svg-icons'
import {
  faBook,
  faComment,
  faEnvelope,
  faMoon,
  faPenSquare,
  faPlusCircle,
  faSync,
  faTimes,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useReducer, useRef } from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { Route } from 'react-router'
import { GoogleFont, TypographyStyle } from 'react-typography'
import { LOCAL_STORAGE } from '../enums'
import { createClient } from '../services/Apollo/clientConfig'
import { LocalStorage } from '../services/LocalStorage'
import {
  initialState,
  isAuthorized,
  IState,
  NoteContext,
  TActions,
} from '../store'
import { combinedReducers } from '../store/reducers'
import { typography } from '../theme/typography'
import { Editor } from './templates'
import { Callback, GlobalStyle, Router, ThemeProvider } from './utility'

library.add(
  faGithub as any,
  faSoundcloud as any,
  faEnvelope,
  faUser,
  faMoon,
  faComment,
  faPenSquare,
  faBook,
  faPlusCircle,
  faSync,
  faTrash,
  faTimes
)

export function App() {
  const [state, dispatch] = useReducer<React.Reducer<IState, TActions>>(
    combinedReducers as any,
    initialState
  )

  const client = useRef(createClient(state, dispatch))

  const token = LocalStorage.getItem(LOCAL_STORAGE.KEY)

  useEffect(() => {
    if (token) {
      dispatch(isAuthorized(true))
    }
  }, [token])

  return (
    <ApolloProvider client={client.current}>
      <ApolloHooksProvider client={client.current}>
        <ThemeProvider>
          <NoteContext.Provider value={[state, dispatch]}>
            <GlobalStyle />
            <TypographyStyle typography={typography} />
            <GoogleFont typography={typography} />
            <Router>
              <Route path="/" exact component={Editor} />
              <Route path="/callback" exact component={Callback} />
            </Router>
          </NoteContext.Provider>
        </ThemeProvider>
      </ApolloHooksProvider>
    </ApolloProvider>
  )
}
