import React from 'react'
import { GoogleFont, TypographyStyle } from 'react-typography'
import {
  ApolloProvider,
  GlobalStyle,
  Router,
  ThemeProvider,
  IconProvider,
} from './utility'
import { useColorModeFromLocalStorage } from '../hooks'
import Typography from 'typography'

export function App() {
  const { colorMode, loading } = useColorModeFromLocalStorage()

  return (
    <ApolloProvider>
      {!loading && (
        <ThemeProvider colorMode={colorMode}>
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
    </ApolloProvider>
  )
}
