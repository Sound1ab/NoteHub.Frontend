import { useCallback, useLayoutEffect, useState } from 'react'
import { COLOR_MODE, LOCAL_STORAGE } from '../enums'
import { useLocalStorage } from './useLocalStorage'

const DEFAULT_COLOR_MODE = COLOR_MODE.LIGHT

export function useColorModeFromLocalStorage(): {
  colorMode: COLOR_MODE,
  toggleColorMode: () => void,
  loading: boolean
  isDarkMode: boolean
} {
  const [storedColorMode, storeColorMode] = useLocalStorage(LOCAL_STORAGE.COLOR_MODE)
  const [colorMode, setColorMode] = useState(DEFAULT_COLOR_MODE)
  const [loading, setLoading] = useState(true)

  const storeAndSetColorMode = useCallback((newColorMode: COLOR_MODE) => {
    storeColorMode(newColorMode as any)
    setColorMode(newColorMode)
  }, [storeColorMode])

  const toggleColorMode = () => {
    const newMode = colorMode === COLOR_MODE.DARK ? COLOR_MODE.LIGHT : COLOR_MODE.DARK
    storeAndSetColorMode(newMode)
  }

  useLayoutEffect(() => {
    const loadedColorMode =
      storedColorMode ||
      DEFAULT_COLOR_MODE
    storeAndSetColorMode(loadedColorMode as COLOR_MODE)
    setLoading(false)
  }, [storeAndSetColorMode, storedColorMode])

  const isDarkMode = colorMode === COLOR_MODE.DARK

  return {colorMode, toggleColorMode, loading, isDarkMode}
}
