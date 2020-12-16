import Typography from 'typography'

export const createTypography = (isLargeText: boolean) => {
  return new Typography({
    baseFontSize: isLargeText ? '16px' : '14px',
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
  })
}
