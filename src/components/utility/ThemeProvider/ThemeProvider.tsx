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

  return (
    <StyledThemeProvider
      theme={{
        spacing,
        colors: themeColors,
        rhythm: typography.rhythm,
      }}
    >
      {children(typography)}
    </StyledThemeProvider>
  )
}
