import Typography from 'typography'

import { TColors } from './index'

export const createTypography = (colors: TColors) => {
  return new Typography({
    baseFontSize: '14px',
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
    scaleRatio: 2.2,
    headerWeight: 300,
    overrideThemeStyles: () => ({
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
        color: colors.accent,
        fontWeight: 'bold',
      },
      h2: {
        color: colors.accent,
        fontWeight: 'bold',
      },
      h3: {
        color: colors.accent,
        fontWeight: 'bold',
      },
      h4: {
        color: colors.accent,
      },
    }),
  })
}
