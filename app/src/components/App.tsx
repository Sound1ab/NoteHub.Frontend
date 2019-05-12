import React, { useReducer } from 'react'
import { GoogleFont, TypographyStyle } from 'react-typography'
import { useToken } from '../hooks'
import {
  initialState,
  IState,
  NoteContext,
  TActions,
} from '../store'
import { combinedReducers } from '../store/reducers'
import { typography } from '../theme/typography'
import { ApolloProvider, GlobalStyle, Router, ThemeProvider } from './utility'
import { IconProvider } from './utility/IconProvider/IconProvider'

export function App() {
  const [state, dispatch] = useReducer<React.Reducer<IState, TActions>>(
    combinedReducers as any,
    initialState
  )
  useToken(dispatch)

  return (
    <NoteContext.Provider value={[state, dispatch]}>
      <ApolloProvider>
        <ThemeProvider>
          <IconProvider>
            <GlobalStyle />
            <TypographyStyle typography={typography} />
            <GoogleFont typography={typography} />
            <Router />
          </IconProvider>
        </ThemeProvider>
      </ApolloProvider>
    </NoteContext.Provider>
  )
}
