import '@testing-library/jest-dom/extend-expect'

import { EventType } from '@testing-library/dom/types/events'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import React, { ReactNode } from 'react'

import {
  IconProvider,
  MockProvider,
  ThemeProvider,
} from './components/providers'
import { FileTreeProvider } from './components/templates/Dashboard/Sidebar/FileTree/FileTreeProvider'

export type FireObject = {
  [K in EventType]: (
    element: Document | Element | Window,
    options?: {}
  ) => Promise<boolean>
}
;(global as any).matchMedia = () => ({ matches: false })

const Context = ({ node }: { node: ReactNode }) => (
  <MockProvider>
    <ThemeProvider>
      {() => (
        <IconProvider>
          <FileTreeProvider>{node}</FileTreeProvider>
        </IconProvider>
      )}
    </ThemeProvider>
  </MockProvider>
)

const customRender = async (
  node: ReactNode,
  { waitForLoad = true, ...options } = {}
) => {
  const { rerender, ...rest } = render(<Context node={node} />, options)

  if (waitForLoad) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await act(() => waitFor(() => {}))
  }

  return {
    ...rest,
    rerender: async (node: ReactNode) => {
      rerender(<Context node={node} />)

      // eslint-disable-next-line @typescript-eslint/no-empty-function
      await act(() => waitFor(() => {}))
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
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      await act(() => waitFor(() => {}))
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
