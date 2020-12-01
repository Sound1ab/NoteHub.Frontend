import React, { ReactNode } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import Typography from 'typography'

import { COLOR_MODE } from '../../../enums'
import { useReadAccentColor, useReadThemeSettings } from '../../../hooks'
import { breakpoints, colors, createSpacing } from '../../../theme/theme'
import { createTypography } from '../../../theme/typography'

interface IThemeProvider {
  children: (typography: Typography) => ReactNode
}

export function ThemeProvider({ children }: IThemeProvider) {
  const { isLargeText } = useReadThemeSettings()
  const accentColor = useReadAccentColor()
  const { isLightTheme } = useReadThemeSettings()
  const { accent, ...rest } = colors[
    isLightTheme ? COLOR_MODE.LIGHT : COLOR_MODE.DARK
  ]
  const themeColors = { ...rest, accent: accentColor || accent }
  const typography = createTypography(themeColors, isLargeText)
  const spacing = createSpacing(typography)

  // @ts-ignore
  const { h1, h2, h3, h4, h5, h6, html } = typography.toJSON()

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
