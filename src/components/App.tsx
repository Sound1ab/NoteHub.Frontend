import React, { useReducer } from 'react'
import { GoogleFont, TypographyStyle } from 'react-typography'
import { FileContext, initialState, IState, TActions } from '../store'
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
