import { COLOR_MODE } from '../enums'
import { typography } from './typography'

export const theme = {
  colors: {
    [COLOR_MODE.LIGHT]: {
      accent: '#ffd21c',
      background: {
        primary: '#fff',
        secondary: '#f8f8f8',
        tertiary: '#f5f5f5',
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
    [COLOR_MODE.DARK]: {
      accent: '#ffd21c',
      background: {
        primary: '#272822',
        secondary: '#272727',
        tertiary: '#4b4b4b',
      },
      link: {
        active: '#e8e8e8',
        hover: '#f0f0f0',
      },
      text: {
        primary: '#e9e9e9',
        secondary: '#a2a2a2',
        tertiary: '#8a8a8a',
      },
    }
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
