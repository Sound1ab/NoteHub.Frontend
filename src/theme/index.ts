import baseStyled, { ThemedStyledInterface } from 'styled-components'
import { colors, createSpacing } from './theme'

type TSpacing = ReturnType<typeof createSpacing>
export type TColors = typeof colors['dark']

export interface ITheme {
  colors: TColors
  spacing: TSpacing
}

export const styled = baseStyled as ThemedStyledInterface<ITheme>
