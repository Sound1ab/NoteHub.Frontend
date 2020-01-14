import Typography from 'typography'

import { TColors } from './index'

export const createTypography = (colors: TColors) => {
  return new Typography({
    baseFontSize: '14px',
    bodyFontFamily: [
      'Roboto',
      'Ubuntu',
      'Cantarell',
      'Open Sans',
      'Helvetica Neue',
      'sans-serif',
    ],
    headerFontFamily: [
      'Roboto',
      'Ubuntu',
      'Cantarell',
      'Open Sans',
      'Helvetica Neue',
      'sans-serif',
    ],
    overrideThemeStyles: () => ({
      form: {
        marginBottom: 0,
      },
      p: {
        color: colors.text.primary,
      },
      ul: {
        margin: 0,
      },
      li: {
        color: colors.text.primary,
        margin: 0,
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
      h5: {
        color: colors.accent,
      },
      h6: {
        color: colors.accent,
      },
    }),
  })
}
