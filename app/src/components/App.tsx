import React, { useEffect, useReducer } from 'react'
import { GoogleFont, TypographyStyle } from 'react-typography'
import { LOCAL_STORAGE } from '../enums'
import { useLocalStorage } from '../hooks'
import {
  FileContext,
  initialState,
  isAuthorized,
  IState,
  resetRepo,
  resetUser,
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
  const [token] = useLocalStorage(LOCAL_STORAGE.KEY)

  useEffect(() => {
    if (token) {
      dispatch(isAuthorized(true))
    } else {
      dispatch(isAuthorized(false))
      dispatch(resetRepo())
      dispatch(resetUser())
    }
  }, [token])

  return (
    <FileContext.Provider value={[state, dispatch]}>
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
    </FileContext.Provider>
  )
}
