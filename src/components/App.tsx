import React from 'react'
import { GoogleFont, TypographyStyle } from 'react-typography'
import Typography from 'typography'

import {
  ApolloProvider,
  GlobalStyle,
  IconProvider,
  Router,
  ThemeProvider,
} from './utility'

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
