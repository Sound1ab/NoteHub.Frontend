import '@testing-library/jest-dom/extend-expect'

import { render } from '@testing-library/react'
import React, { ReactNode } from 'react'

import { IconProvider, ThemeProvider } from './components/utility'
import { COLOR_MODE } from './enums'

const Context = ({ node }: { node: ReactNode }) => (
  <ThemeProvider colorMode={COLOR_MODE.DARK}>
    {() => <IconProvider>{node}</IconProvider>}
  </ThemeProvider>
)

const customRender = (node: ReactNode, ...options: any[]) => {
  const { rerender, ...rest } = render(<Context node={node} />, ...options)

  return {
    ...rest,
    rerender: (node: ReactNode) => rerender(<Context node={node} />),
  }
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
