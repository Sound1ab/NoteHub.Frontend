import Typography from 'typography'

export function createSpacing(typography: Typography) {
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

export const boxShadow = `
  0 6px 8px rgba(0,0,0,0.11),
  0 8px 16px rgba(0,0,0,0.11);`

export const transition = 'all 350ms ease-in-out'

export const breakpoints = {
  tablet: '768px',
  mDPIDesktop: '1280px',
  HiDPIDesktop: '1440px',
}
