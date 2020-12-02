import { darken, lighten } from 'polished'
import Typography from 'typography'

import { COLOR_MODE } from '../enums'

export const createSpacing = (typography: Typography) => {
  return {
    xxxl: typography.rhythm(14),
    xxl: typography.rhythm(10),
    xl: typography.rhythm(7),
    l: typography.rhythm(3),
    ml: typography.rhythm(2),
    m: typography.rhythm(1.5),
    ms: typography.rhythm(1.3),
    s: typography.rhythm(1),
    sm: typography.rhythm(0.6),
    xs: typography.rhythm(0.5),
    xxs: typography.rhythm(0.25),
    xxxs: typography.rhythm(0.1),
  }
}

export const boxShadow = `0 1px 1px rgba(0,0,0,0.11),
  0 2px 2px rgba(0,0,0,0.11),
  0 4px 4px rgba(0,0,0,0.11),
  0 6px 8px rgba(0,0,0,0.11),
  0 8px 16px rgba(0,0,0,0.11);`

export const breakpoints = {
  tablet: '768px',
  mDPIDesktop: '1280px',
  HiDPIDesktop: '1440px',
}

const darkPrimary = '#1e1e1e'
const lightPrimary = '#e2e2e2'
const accentChoices = {
  primary: '#7072dd',
  secondary: '#70dda5',
  tertiary: '#dd7089',
  quaternary: '#bcc12f',
  quinary: '#c1622f',
}
const company = {
  github: '#04AA51',
}
const feedback = {
  info: '#3498db',
  warning: '#f1c40f',
  error: '#e74c3c',
}

export const colors = {
  [COLOR_MODE.LIGHT]: {
    accent: accentChoices.primary,
    accentChoices,
    background: {
      primary: lightPrimary,
      secondary: darken(0.05, lightPrimary),
      tertiary: darken(0.07, lightPrimary),
      quaternary: darken(0.09, lightPrimary),
      quinary: darken(0.1, lightPrimary),
    },
    border: lighten(0.03, lightPrimary),
    text: {
      primary: lighten(0.1, darkPrimary),
      secondary: lighten(0.3, darkPrimary),
      tertiary: lighten(0.5, darkPrimary),
    },
    company,
    feedback,
  },
  [COLOR_MODE.DARK]: {
    accent: accentChoices.primary,
    accentChoices,
    background: {
      primary: darkPrimary,
      secondary: lighten(0.05, darkPrimary),
      tertiary: lighten(0.07, darkPrimary),
      quaternary: lighten(0.09, darkPrimary),
      quinary: lighten(0.1, darkPrimary),
    },
    border: darken(0.03, darkPrimary),
    text: {
      primary: darken(0.1, lightPrimary),
      secondary: darken(0.3, lightPrimary),
      tertiary: darken(0.5, lightPrimary),
    },
    company,
    feedback,
  },
}
