import React, { createContext } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { COLOR_MODE } from '../../../enums'
import { useColorModeFromLocalStorage } from '../../../hooks/useColorModeFromLocalStorage'
import { theme } from '../../../theme/theme'

export const ColorModeContext = createContext<{
  colorMode: COLOR_MODE
  toggleColorMode: () => void
}>(null as any)

interface IThemeProvider {
  children: any
}

export function ThemeProvider({ children }: IThemeProvider) {
  const {colorMode, toggleColorMode, loading} = useColorModeFromLocalStorage()

  return (
    <StyledThemeProvider theme={{
      ...theme,
      colors: theme.colors[colorMode],
    }}>
      <ColorModeContext.Provider
        value={{ colorMode, toggleColorMode }}
      >
      {!loading && children}
      </ColorModeContext.Provider>
    </StyledThemeProvider>
  )
}
