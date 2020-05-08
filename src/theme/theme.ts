import Typography from 'typography'

import { COLOR_MODE } from '../enums'

export const createSpacing = (typography: Typography) => {
  return {
    l: typography.rhythm(3),
    ml: typography.rhythm(2),
    m: typography.rhythm(1.5),
    s: typography.rhythm(1),
    xl: typography.rhythm(7),
    xs: typography.rhythm(0.5),
    xxl: typography.rhythm(10),
    xxs: typography.rhythm(0.25),
    xxxl: typography.rhythm(14),
    xxxs: typography.rhythm(0.1),
  }
}

export const breakpoints = {
  tablet: '768px',
  mDPIDesktop: '1280px',
  HiDPIDesktop: '1440px',
}

export const colors = {
  [COLOR_MODE.LIGHT]: {
    accent: '#ff00b2',
    background: {
      primary: '#ffffff',
      secondary: '#f8f8f8',
      tertiary: '#ffffff',
      quaternary: '#f5f5f5',
      quinary: '#c7c7c7',
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
    company: {
      github: '#04AA51',
    },
  },
  [COLOR_MODE.DARK]: {
    accent: '#ff00b2',
    background: {
      primary: '#1e1e1e',
      secondary: '#282828',
      tertiary: '#2b2b2b',
      quaternary: '#3a3a3a',
      quinary: '#484848',
    },
    border: '#141414',
    link: {
      active: '#e8e8e8',
      hover: '#f0f0f0',
    },
    text: {
      primary: '#e9e9e9',
      secondary: '#a2a2a2',
      tertiary: '#8a8a8a',
    },
    company: {
      github: '#04AA51',
    },
  },
}
