import baseStyled, { ThemedStyledInterface } from 'styled-components'
import { COLOR_MODE } from '../enums'
import { theme } from './theme'

export interface ITheme {
  colors: typeof theme.colors[COLOR_MODE.DARK]
  spacing: typeof theme.spacing
}

export const styled = baseStyled as ThemedStyledInterface<ITheme>
