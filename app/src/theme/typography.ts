import Typography from 'typography'
import moragaTheme from 'typography-theme-moraga'

export const typography = new Typography({
  ...moragaTheme,
  baseFontSize: '16px',
  overrideThemeStyles: ({ rhythm }) => ({
    h5: {
      marginBottom: rhythm(0.25),
    },
    h6: {
      marginBottom: rhythm(0.25),
    },
  }),
})
