import { useReactiveVar } from '@apollo/client'
import { useLayoutEffect } from 'react'

import { localState } from '../../components/providers/ApolloProvider/cache'
import { COLOR_MODE } from '../../enums'

export function useDarkMode() {
  const currentTheme = useReactiveVar(localState.currentThemeVar)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      localState.currentThemeVar(COLOR_MODE.DARK)
    } else {
      localState.currentThemeVar(COLOR_MODE.LIGHT)
    }
  }, [])

  const isDarkMode = currentTheme === COLOR_MODE.DARK

  function toggleTheme() {
    const toggledTheme = isDarkMode ? COLOR_MODE.LIGHT : COLOR_MODE.DARK
    localState.currentThemeVar(toggledTheme)
  }

  return {
    theme: currentTheme,
    toggleTheme,
    isDarkMode,
  }
}
