import { typography } from './typography'

export const theme = {
  colors: {
    brand: '#10ad52',
    text: {
      primary: '#171717',
      secondary: '#858585',
      tertiary: '#ffffff',
    },
  },
  spacing: {
    l: typography.rhythm(3),
    m: typography.rhythm(1.5),
    s: typography.rhythm(1),
    xl: typography.rhythm(7),
    xs: typography.rhythm(0.5),
    xxl: typography.rhythm(10),
    xxs: typography.rhythm(0.25),
  },
}
