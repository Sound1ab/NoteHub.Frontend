import Typography from 'typography'

export function createSpacing(typography: Typography) {
  return {
    xxxl: typography.rhythm(17.1),
    xxl: typography.rhythm(10.2),
    xl: typography.rhythm(4.8),
    l: typography.rhythm(3.2),
    ml: typography.rhythm(2.2),
    m: typography.rhythm(1.7),
    ms: typography.rhythm(1.5),
    s: typography.rhythm(1.2),
    sm: typography.rhythm(1),
    xs: typography.rhythm(0.9),
    xxs: typography.rhythm(0.65),
    xxxs: typography.rhythm(0.2),
  }
}

export const boxShadow = `
  0 6px 8px rgba(0,0,0,0.11),
  0 8px 16px rgba(0,0,0,0.11);`

export const transition = 'all 350ms ease-in-out'

export const borderRadius = '10px'

export const breakpoints = {
  tablet: '768px',
  mDPIDesktop: '1280px',
  HiDPIDesktop: '1440px',
}
