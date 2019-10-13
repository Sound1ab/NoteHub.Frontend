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
import {
  ApolloProvider,
  ColorModeContext,
  GlobalStyle,
  Router,
  ThemeProvider,
} from './utility'
import { IconProvider } from './utility/IconProvider/IconProvider'
import { useColorModeFromLocalStorage } from '../hooks/useColorModeFromLocalStorage'
import Typography from 'typography'

export function App() {
  const [state, dispatch] = useReducer<React.Reducer<IState, TActions>>(
    combinedReducers as any,
    initialState
  )
  const {
    colorMode,
    toggleColorMode,
    loading,
    isDarkMode,
  } = useColorModeFromLocalStorage()

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
        <ColorModeContext.Provider
          value={{ colorMode, toggleColorMode, isDarkMode }}
        >
          {!loading && (
            <ThemeProvider>
              {(typography: Typography) => (
                <IconProvider>
                  <GlobalStyle isDarkMode />
                  <TypographyStyle typography={typography} />
                  <GoogleFont typography={typography} />
                  <Router />
                </IconProvider>
              )}
            </ThemeProvider>
          )}
        </ColorModeContext.Provider>
      </ApolloProvider>
    </FileContext.Provider>
  )
}
