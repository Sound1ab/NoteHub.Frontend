import React from 'react'
import { GoogleFont, TypographyStyle } from 'react-typography'
import {
  ApolloProvider,
  ColorModeContext,
  GlobalStyle,
  Router,
  ThemeProvider,
} from './utility'
import { IconProvider } from './utility/IconProvider/IconProvider'
import { useColorModeFromLocalStorage } from '../hooks'
import Typography from 'typography'

export function App() {
  const {
    colorMode,
    toggleColorMode,
    loading,
    isDarkMode,
  } = useColorModeFromLocalStorage()

  return (
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
  )
}
