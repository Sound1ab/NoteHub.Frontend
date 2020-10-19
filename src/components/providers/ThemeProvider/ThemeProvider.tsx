import React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { useDarkMode, useReadAccentColor } from '../../../hooks'
import { breakpoints, colors, createSpacing } from '../../../theme/theme'
import { createTypography } from '../../../theme/typography'

interface IThemeProvider {
  children: any
}

export function ThemeProvider({ children }: IThemeProvider) {
  const accentColor = useReadAccentColor()
  const { theme } = useDarkMode()
  const { accent, ...rest } = colors[theme]
  const themeColors = { ...rest, accent: accentColor || accent }
  const typography = createTypography(themeColors)
  const spacing = createSpacing(typography)

  const { h1, h2, h3, h4, h5, h6, html } = typography.toJSON() as any

  return (
    <StyledThemeProvider
      theme={{
        spacing,
        colors: themeColors,
        breakpoints,
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
