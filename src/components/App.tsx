import React from 'react'
import { GoogleFont, TypographyStyle } from 'react-typography'
import { typography } from '../theme/typography'
import { Container, TextArea } from './atoms'
import { GlobalStyle, ThemeProvider } from './utility'

export function App() {
  return (
    <ThemeProvider>
      <>
        <GlobalStyle />
        <TypographyStyle typography={typography} />
        <GoogleFont typography={typography} />
        <Container>
          <TextArea />
        </Container>
      </>
    </ThemeProvider>
  )
}
