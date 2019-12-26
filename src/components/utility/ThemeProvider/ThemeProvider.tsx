import React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { COLOR_MODE } from '../../../enums'
import { colors, createSpacing } from '../../../theme/theme'
import { createTypography } from '../../../theme/typography'

interface IThemeProvider {
  colorMode: COLOR_MODE
  children: any
}

export function ThemeProvider({ children, colorMode }: IThemeProvider) {
  const themeColors = colors[colorMode]
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
