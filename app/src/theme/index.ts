import baseStyled, { ThemedStyledInterface } from 'styled-components'
import { theme } from './theme'

export type Theme = typeof theme
export const styled = baseStyled as ThemedStyledInterface<Theme>
