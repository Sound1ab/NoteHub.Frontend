import '@testing-library/jest-dom/extend-expect'

import { EventType } from '@testing-library/dom/types/events'
import { act, fireEvent, render } from '@testing-library/react'
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
    options?: Record<string, unknown>
  ) => Promise<boolean>
}
global.matchMedia = () =>
  ({
    matches: false,
  } as MediaQueryList)

const wait = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1)
  })
}

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
    await act(wait)
  }

  return {
    ...rest,
    rerender: async (node: ReactNode) => {
      rerender(<Context node={node} />)

      // eslint-disable-next-line @typescript-eslint/no-empty-function
      await act(wait)
    },
  }
}

const customFireEvent = Object.entries(fireEvent).reduce(
  (
    acc: Record<
      string,
      (
        element: Document | Element | Window,
        options: Record<string, string>
      ) => Promise<unknown>
    >,
    keyValue
  ) => {
    const [key, value] = keyValue
    acc[key] = async (
      element: Document | Element | Window,
      options: Record<string, unknown>
    ) => {
      if (typeof value === 'function') {
        value(element, options)
      }
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      await act(wait)
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
