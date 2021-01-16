import Typography from 'typography'

export const createTypography = (isLargeText: boolean) => {
  return new Typography({
    baseFontSize: isLargeText ? '16px' : '14px',
    googleFonts: [
      {
        name: 'Nunito',
        styles: ['700'],
      },
      {
        name: 'Merriweather',
        styles: ['400', '400i', '700', '700i'],
      },
    ],
    bodyFontFamily: [
      'Nunito',
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
      'Nunito',
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
    overrideThemeStyles: ({ rhythm, scale }) => ({
      body: {
        fontSizeAdjust: '0.5',
      },
      form: {
        marginBottom: 0,
      },
      p: {
        color: 'var(--text-primary)',
      },
      pre: {
        fontSize: scale(1),
      },
      li: {
        color: 'var(--text-primary)',
      },
      h1: {
        color: 'var(--text-primary)',
        fontWeight: 'bold',
        marginBottom: rhythm(1),
      },
      h2: {
        color: 'var(--text-primary)',
        fontWeight: 'bold',
        marginBottom: rhythm(1),
      },
      h3: {
        color: 'var(--text-primary)',
        fontWeight: 'bold',
        marginBottom: rhythm(0.8),
      },
      h4: {
        color: 'var(--text-primary)',
        marginBottom: rhythm(0.6),
      },
      h5: {
        color: 'var(--text-primary)',
        marginBottom: rhythm(0.4),
      },
      h6: {
        color: 'var(--text-primary)',
        marginBottom: rhythm(0.2),
      },
      hr: {
        background: 'var(--accent-primary)',
      },
      blockquote: {
        padding: `0 ${rhythm(1)}`,
        borderLeft: `${rhythm(0.2)} solid var(--text-secondary)`,
        margin: `0 0 ${rhythm(1)} 0`,
      },
    }),
  })
}
