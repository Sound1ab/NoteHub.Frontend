import { typography } from './typography'

export const theme = {
  colors: {
    accent: '#98c8c4',
    brand: '#302f31',
    text: {
      primary: '#171717',
      secondary: '#acacac',
      tertiary: '#ffffff',
    },
    link: {
      hover: '#d6d6d6',
      active: '#f3f3f3'
    },
    background: {
      primary: '#fff',
      secondary: '#f8f8f8'
    }
  },
  spacing: {
    l: typography.rhythm(3),
    m: typography.rhythm(1.5),
    s: typography.rhythm(1),
    xl: typography.rhythm(7),
    xs: typography.rhythm(0.5),
    xxl: typography.rhythm(10),
    xxxl: typography.rhythm(14),
    xxs: typography.rhythm(0.25),
    xxxs: typography.rhythm(0.1),
  },
}
