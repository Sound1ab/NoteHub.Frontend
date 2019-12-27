import React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { useDarkMode } from '../../../hooks'
import { colors, createSpacing } from '../../../theme/theme'
import { createTypography } from '../../../theme/typography'

interface IThemeProvider {
  children: any
}

export function ThemeProvider({ children }: IThemeProvider) {
  const { currentTheme } = useDarkMode()
  const themeColors = colors[currentTheme]
  const typography = createTypography(themeColors)
  const spacing = createSpacing(typography)

  const { h1, h2, h3, h4, h5, h6, html } = typography.toJSON() as any

  return (
    <StyledThemeProvider
      theme={{
        spacing,
        colors: themeColors,
        rhythm: typography.rhythm,
        typographyStyles: {
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          html,
        },
      }}
    >
      {children(typography)}
    </StyledThemeProvider>
  )
}
