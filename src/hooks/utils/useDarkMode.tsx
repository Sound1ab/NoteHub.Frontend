import { useLayoutEffect } from 'react'

import { COLOR_MODE } from '../../enums'
import { useReadCurrentTheme } from '..'

export function useDarkMode() {
  const { currentTheme, client } = useReadCurrentTheme()

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      client.writeData({ data: { currentTheme: COLOR_MODE.DARK } })
    } else {
      client.writeData({ data: { currentTheme: COLOR_MODE.LIGHT } })
    }
  }, [client])

  const isDarkMode = currentTheme === COLOR_MODE.DARK

  function toggleTheme() {
    const toggledTheme = isDarkMode ? COLOR_MODE.LIGHT : COLOR_MODE.DARK
    client.writeData({ data: { currentTheme: toggledTheme } })
  }

  return {
    currentTheme,
    toggleTheme,
    isDarkMode,
  }
}
