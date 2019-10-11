import { COLOR_MODE } from '../enums'
import { typography } from './typography'

export const theme = {
  colors: {
    [COLOR_MODE.LIGHT]: {
      accent: '#ffd21c',
      background: {
        primary: '#ffffff',
        secondary: '#f8f8f8',
        tertiary: '#f5f5f5',
        quaternary: '#f5f5f5',
      },
      border: '#d8d8d8',
      link: {
        active: '#e8e8e8',
        hover: '#f0f0f0',
      },
      text: {
        primary: '#171717',
        secondary: '#e1e1e1',
        tertiary: '#e6e6e6',
      },
    },
    [COLOR_MODE.DARK]: {
      accent: '#ffd21c',
      background: {
        primary: '#272822',
        secondary: '#282828',
        tertiary: '#1e1e1e',
        quaternary: '#3a3a3a',
      },
      border: '#303030',
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
