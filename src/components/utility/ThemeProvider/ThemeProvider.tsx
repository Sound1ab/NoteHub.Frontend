import React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { theme } from '../../../theme/theme'

interface IThemeProvider {
  children: any
}

export function ThemeProvider({ children }: IThemeProvider) {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
}
