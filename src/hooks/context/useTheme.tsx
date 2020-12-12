import { ThemeContext } from 'styled-components'

import { useNotNullableContext } from '..'

export const useTheme = () => useNotNullableContext(ThemeContext)
