import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { IconProvider, ThemeProvider } from './components/utility'
import { COLOR_MODE } from './enums'

const customRender = (node: any, ...options: any[]) =>
  render(
    <ThemeProvider colorMode={COLOR_MODE.DARK}>
      {() => <IconProvider>{node}</IconProvider>}
    </ThemeProvider>,
    ...options
  )

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
