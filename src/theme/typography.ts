import Typography from 'typography'

export const typography = new Typography({
  baseFontSize: '16px',
  bodyFontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Oxygen',
    'Roboto',
    'Ubuntu',
    'Cantarell',
    'Open Sans',
    'Helvetica Neue',
    'sans-serif',
  ],
  headerFontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Oxygen',
    'Roboto',
    'Ubuntu',
    'Cantarell',
    'Open Sans',
    'Helvetica Neue',
    'sans-serif',
  ],
  headerWeight: 300,
  overrideThemeStyles: ({ rhythm }) => ({
    h5: {
      marginBottom: rhythm(0.25),
    },
    h6: {
      marginBottom: rhythm(0.25),
    },
  }),
})
