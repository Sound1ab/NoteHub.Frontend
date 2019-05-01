import Typography from 'typography'

export const typography = new Typography({
  baseFontSize: '14px',
  baseLineHeight: 1.666,
  bodyFontFamily: ['Montserrat'],
  googleFonts: [
    {
      name: 'Montserrat',
      styles: ['400', '300', '200', '100'],
    },
  ],
  headerFontFamily: ['Montserrat'],
  overrideThemeStyles: ({ rhythm }) => ({
    h1: {
      marginBottom: rhythm(1.5),
    },
    h2: {
      marginBottom: rhythm(1),
    },
    h3: {
      marginBottom: rhythm(1),
    },
    h4: {
      marginBottom: rhythm(0.5),
    },
    h5: {
      marginBottom: rhythm(0.25),
    },
    h6: {
      marginBottom: rhythm(0.25),
    },
  }),
})
