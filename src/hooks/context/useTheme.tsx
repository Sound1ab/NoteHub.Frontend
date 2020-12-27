import { ThemeContext } from 'styled-components'

import { useNotNullableContext } from '../utils/useNotNullableContext'

export const useTheme = () => useNotNullableContext(ThemeContext)
