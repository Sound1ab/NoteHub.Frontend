import React, { ReactNode } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import Typography from 'typography'

import { COLOR_MODE } from '../../../enums'
import { useReadThemeSettings } from '../../../hooks/localState/useReadThemeSettings'
import {
  borderRadius,
  boxShadow,
  breakpoints,
  createSpacing,
  transition,
} from '../../../theme/theme'
import { createTypography } from '../../../theme/typography'

interface IThemeProvider {
  children: (typography: Typography) => ReactNode
}

export function ThemeProvider({ children }: IThemeProvider) {
  const { isLargeText } = useReadThemeSettings()
  const { isLightTheme } = useReadThemeSettings()
  const typography = createTypography(isLargeText)
  const spacing = createSpacing(typography)

  document.documentElement.dataset.theme = isLightTheme
    ? COLOR_MODE.LIGHT
    : COLOR_MODE.DARK

  return (
    <StyledThemeProvider
      theme={{
        spacing,
        breakpoints,
        rhythm: typography.rhythm,
        // @ts-ignore
        typographyStyles: typography.toJSON(),
        boxShadow,
        transition,
        borderRadius,
      }}
    >
      {children(typography)}
    </StyledThemeProvider>
  )
}
