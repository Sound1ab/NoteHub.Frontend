import Typography from 'typography'

export const createTypography = (isLargeText: boolean) => {
  return new Typography({
    googleFonts: [
      {
        name: 'Nunito',
        styles: ['600', '700'],
      },
    ],
    includeNormalize: true,
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
    baseFontSize: '14px',
    scaleRatio: 2.5,
    baseLineHeight: 1,
    overrideThemeStyles: ({ rhythm, scale }) => ({
      '*': {
        overscrollBehavior: 'none',
      },
      body: {
        fontSize: isLargeText ? '16px' : '14px',
      },
      form: {
        marginBottom: 0,
      },
      p: {
        color: 'var(--text-primary)',
        lineHeight: 1.5,
      },
      pre: {
        fontSize: scale(1),
      },
      li: {
        color: 'var(--text-primary)',
        lineHeight: 1.5,
      },
      h1: {
        color: 'var(--text-primary)',
        letterSpacing: '0.036em',
        fontWeight: 'bold',
        marginBottom: rhythm(1),
      },
      h2: {
        letterSpacing: '0.036em',
        color: 'var(--text-primary)',
        marginBottom: rhythm(1),
      },
      h3: {
        letterSpacing: '0.036em',
        color: 'var(--text-primary)',
        marginBottom: rhythm(0.8),
      },
      h4: {
        letterSpacing: '0.036em',
        color: 'var(--text-primary)',
        marginBottom: rhythm(0.6),
      },
      h5: {
        letterSpacing: '0.036em',
        color: 'var(--text-primary)',
        marginBottom: rhythm(0.4),
      },
      h6: {
        letterSpacing: '0.036em',
        color: 'var(--text-primary)',
        marginBottom: rhythm(0.2),
      },
      hr: {
        background: 'var(--accent-primary)',
      },
      blockquote: {
        color: 'var(--text-primary)',
        padding: `0 ${rhythm(1)}`,
        borderLeft: `${rhythm(0.2)} solid var(--accent-primary)`,
        margin: `0 0 ${rhythm(1)} 0`,
        lineHeight: 1.5,
      },
      a: {
        color: 'var(--accent-primary)',
        textDecoration: 'none',
      },
    }),
  })
}
