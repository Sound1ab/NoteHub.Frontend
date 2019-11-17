import React, { createContext, useContext } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { COLOR_MODE } from '../../../enums'
import { colors, createSpacing } from '../../../theme/theme'
import { createTypography } from '../../../theme/typography'

export const ColorModeContext = createContext<{
  colorMode: COLOR_MODE
  toggleColorMode: () => void
  isDarkMode: boolean
}>(null as any)

interface IThemeProvider {
  children: any
}

export function ThemeProvider({ children }: IThemeProvider) {
  const { colorMode } = useContext(ColorModeContext)
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
