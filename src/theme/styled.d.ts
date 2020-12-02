import {} from 'styled-components'

import { VerticalRhythm } from 'typography'

import { breakpoints, colors, createSpacing } from './theme'

type TSpacing = ReturnType<typeof createSpacing>
export type TColors = typeof colors['dark']

interface IHeading {
  fontSize: string
  lineHeight: string
  marginBottom: string
  fontWeight: string
  color: string
}

export interface ITheme {
  colors: TColors
  breakpoints: typeof breakpoints
  spacing: TSpacing
  rhythm: VerticalRhythm['rhythm']
  typographyStyles: {
    h1: IHeading
    h2: IHeading
    h3: IHeading
    h4: IHeading
    h5: IHeading
    h6: IHeading
    html: IHeading
  }
  boxShadow: string
}

declare module 'styled-components' {
  // eslint-disable-next-line
  export interface DefaultTheme extends ITheme {}
}
