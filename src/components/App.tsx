import '../theme/ColorPalette.css'

import React from 'react'
import { GoogleFont, TypographyStyle } from 'react-typography'
import Typography from 'typography'

import { Toast } from './atoms/Toast/Toast'
import { ApolloProvider } from './providers/ApolloProvider/ApolloProvider'
import { IconProvider } from './providers/IconProvider/IconProvider'
import { ThemeProvider } from './providers/ThemeProvider/ThemeProvider'
import { GlobalStyle } from './utility/GlobalStyle/GlobalStyle'
import { Router } from './utility/Router/Router'

export function App() {
  return (
    <ApolloProvider>
      <ThemeProvider>
        {(typography: Typography) => (
          <IconProvider>
            <Toast />
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
