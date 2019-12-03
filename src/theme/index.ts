import baseStyled, { ThemedStyledInterface } from 'styled-components'
import { colors, createSpacing } from './theme'
import { VerticalRhythm } from 'typography'

type TSpacing = ReturnType<typeof createSpacing>
export type TColors = typeof colors['dark']

export interface ITheme {
  colors: TColors
  spacing: TSpacing
  rhythm: VerticalRhythm['rhythm']
}

export const styled = baseStyled as ThemedStyledInterface<ITheme>
