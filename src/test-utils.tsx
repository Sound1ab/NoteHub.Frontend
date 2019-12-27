import '@testing-library/jest-dom/extend-expect'

import { wait } from '@apollo/react-testing'
import { act, render } from '@testing-library/react'
import React, { ReactNode } from 'react'

import { IconProvider, MockProvider, ThemeProvider } from './components/utility'

;(global as any).matchMedia = () => ({ matches: false })

const Context = ({ node }: { node: ReactNode }) => (
  <MockProvider>
    <ThemeProvider>{() => <IconProvider>{node}</IconProvider>}</ThemeProvider>
  </MockProvider>
)

const customRender = async (node: ReactNode, ...options: any[]) => {
  const { rerender, ...rest } = render(<Context node={node} />, ...options)

  await act(() => wait(0))

  return {
    ...rest,
    rerender: async (node: ReactNode) => {
      rerender(<Context node={node} />)

      await act(() => wait(0))
    },
  }
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
