import Typography from 'typography'
import { TColors } from './styled'

export const createTypography = (colors: TColors) => {
  return new Typography({
    baseFontSize: '14px',
    bodyFontFamily: [
      '-apple-system',
      'Blink,acSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen-Sans',
      'Ubuntu',
      'Helvetica Neue',
      'sans-serif',
    ],
    headerFontFamily: [
      '-apple-system',
      'Blink,acSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen-Sans',
      'Ubuntu',
      'Helvetica Neue',
      'sans-serif',
    ],
    scaleRatio: 2.9,
    overrideThemeStyles: ({ rhythm }) => ({
      body: {
        fontSizeAdjust: '0.5',
      },
      form: {
        marginBottom: 0,
      },
      p: {
        color: colors.text.primary,
      },
      li: {
        color: colors.text.primary,
      },
      h1: {
        color: colors.text.primary,
        fontWeight: 'bold',
        marginBottom: rhythm(1),
      },
      h2: {
        color: colors.text.primary,
        fontWeight: 'bold',
        marginBottom: rhythm(1),
      },
      h3: {
        color: colors.text.primary,
        fontWeight: 'bold',
        marginBottom: rhythm(0.8),
      },
      h4: {
        color: colors.text.primary,
        marginBottom: rhythm(0.6),
      },
      h5: {
        color: colors.text.primary,
        marginBottom: rhythm(0.4),
      },
      h6: {
        color: colors.text.primary,
        marginBottom: rhythm(0.2),
      },
    }),
  })
}
