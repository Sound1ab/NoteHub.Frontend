import { typography } from './typography'

export const theme = {
  colors: {
    accent: '#f0e1ff',
    background: {
      primary: '#fff',
      secondary: '#f8f8f8',
      tertiary: '#302831',
    },
    link: {
      active: '#e8e8e8',
      hover: '#f0f0f0',
    },
    text: {
      primary: '#171717',
      secondary: '#e1e1e1',
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
    xxxl: typography.rhythm(14),
    xxxs: typography.rhythm(0.1),
  },
}
