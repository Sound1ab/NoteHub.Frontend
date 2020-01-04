import '@testing-library/jest-dom/extend-expect'

import { wait } from '@apollo/react-testing'
import { EventType } from '@testing-library/dom/events'
import { act, fireEvent, render } from '@testing-library/react'
import React, { ReactNode } from 'react'

import { IconProvider, MockProvider, ThemeProvider } from './components/utility'

export type FireObject = {
  [K in EventType]: (
    element: Document | Element | Window,
    options?: {}
  ) => Promise<boolean>
}
;(global as any).matchMedia = () => ({ matches: false })

const Context = ({ node }: { node: ReactNode }) => (
  <MockProvider>
    <ThemeProvider>{() => <IconProvider>{node}</IconProvider>}</ThemeProvider>
  </MockProvider>
)

const customRender = async (
  node: ReactNode,
  { waitForLoad = true, ...options } = {}
) => {
  const { rerender, ...rest } = render(<Context node={node} />, options)

  if (waitForLoad) {
    await act(() => wait(0))
  }

  return {
    ...rest,
    rerender: async (node: ReactNode) => {
      rerender(<Context node={node} />)

      await act(() => wait(0))
    },
  }
}

const customFireEvent: FireObject = Object.entries(fireEvent).reduce(
  (acc: any, keyValue) => {
    const [key, value] = keyValue
    acc[key] = async (element: Document | Element | Window, options: {}) => {
      if (typeof value === 'function') {
        value(element, options)
      }
      await act(() => wait(0))
    }
    return acc
  },
  {}
)

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }

export { customFireEvent as fireEvent }
