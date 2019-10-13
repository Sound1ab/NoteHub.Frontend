import Typography from 'typography'
import { TColors } from './index'

export const createTypography = (colors: TColors) => {
  return new Typography({
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
      form: {
        marginBottom: 0,
      },
      p: {
        color: colors.text.primary
      },
      li: {
        color: colors.text.primary
      },
      h1: {
        color: colors.accent
      },
      h2: {
        color: colors.accent
      },
      h3: {
        color: colors.accent
      },
      h4: {
        color: colors.accent
      },
      h5: {
        marginBottom: rhythm(0.25),
      },
      h6: {
        marginBottom: rhythm(0.25),
      }
    }),
  })
}
