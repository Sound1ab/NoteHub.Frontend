import '@testing-library/jest-dom/extend-expect'

import { EventType } from '@testing-library/dom/types/events'
import { act, fireEvent, render } from '@testing-library/react'
import React, { ReactNode } from 'react'

import { Toast } from './components/atoms'
import {
  EasyMDEProvider,
  IconProvider,
  MockProvider,
  ThemeProvider,
} from './components/providers'
import { FileTreeProvider } from './components/templates/Dashboard/Sidebar/FileTree/FileTreeProvider'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

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

export const wait = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1)
  })
}

const Context = ({
  node,
  enableToast,
}: {
  node: ReactNode
  enableToast: boolean
}) => (
  <MockProvider>
    <ThemeProvider>
      {() => (
        <IconProvider>
          {enableToast && <Toast />}
          <EasyMDEProvider>
            <FileTreeProvider>
              <DndProvider backend={HTML5Backend}>{node}</DndProvider>
            </FileTreeProvider>
          </EasyMDEProvider>
        </IconProvider>
      )}
    </ThemeProvider>
  </MockProvider>
)

const customRender = async (
  node: ReactNode,
  { waitForLoad = true, enableToast = false, ...options } = {}
) => {
  if (enableToast) {
    // Toast uses setTimeout under the hood
    jest.useFakeTimers('modern')
  }

  const { rerender, ...rest } = render(
    <Context node={node} enableToast={enableToast} />,
    options
  )

  if (enableToast) {
    // Make toast timers finish
    act(() => {
      jest.runAllTimers()
    })

    // For apollo provider otherwise test hangs on await
    jest.useRealTimers()
  }

  if (waitForLoad) {
    await act(wait)
  }

  return {
    ...rest,
    rerender: async (node: ReactNode) => {
      if (enableToast) {
        // Toast uses setTimeout under the hood
        jest.useFakeTimers('modern')
      }

      rerender(<Context node={node} enableToast={enableToast} />)

      if (enableToast) {
        // Make toast timers finish
        act(() => {
          jest.runAllTimers()
        })

        // For apollo provider otherwise test hangs on await
        jest.useRealTimers()
      }

      if (waitForLoad) {
        await act(wait)
      }
    },
  }
}

const customFireEvent = Object.entries(fireEvent).reduce(
  /* eslint-disable */
  (acc: any, keyValue) => {
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
