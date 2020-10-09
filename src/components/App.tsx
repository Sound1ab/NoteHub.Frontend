import React from 'react'
import { GoogleFont, TypographyStyle } from 'react-typography'
import Typography from 'typography'

import { ApolloProvider, IconProvider, ThemeProvider } from './providers'
import { GlobalStyle, Router } from './utility'

export function App() {
  return (
    <ApolloProvider>
      <ThemeProvider>
        {(typography: Typography) => (
          <IconProvider>
            <GlobalStyle />
            <TypographyStyle typography={typography} />
            <GoogleFont typography={typography} />
            <Router />
          </IconProvider>
        )}
      </ThemeProvider>
    </ApolloProvider>
  )
}
