import '@testing-library/jest-dom/extend-expect'

import { EventType } from '@testing-library/dom/types/events'
import { act, fireEvent, render } from '@testing-library/react'
import { act as hooksAct, renderHook } from '@testing-library/react-hooks'
import { IMocks } from 'graphql-tools'
import nock from 'nock'
import React, { ReactNode } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { RecoilRoot } from 'recoil'

import { Toast } from './components/atoms/Toast/Toast'
import { MockProvider } from './components/providers/ApolloProvider/MockProvider'
import { IconProvider } from './components/providers/IconProvider/IconProvider'
import { ThemeProvider } from './components/providers/ThemeProvider/ThemeProvider'
import { resolvers as mockResolvers } from './schema/mockResolvers'

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

export const wait = (ms = 1): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

const Context = ({
  node,
  enableToast,
  resolvers,
}: {
  node: ReactNode
  enableToast: boolean
  resolvers?: IMocks
}) => (
  <MockProvider mockResolvers={{ ...mockResolvers, ...resolvers }}>
    <RecoilRoot>
      <ThemeProvider>
        {() => (
          <IconProvider>
            {enableToast && <Toast />}
            <DndProvider backend={HTML5Backend}>{node}</DndProvider>
          </IconProvider>
        )}
      </ThemeProvider>
    </RecoilRoot>
  </MockProvider>
)

async function customRenderHook<T>(
  callback: () => T,
  { enableToast = false, resolvers = {}, ...options } = {}
) {
  const result = renderHook(callback, {
    ...options,
    wrapper: ({ children }) => (
      <Context
        node={children}
        enableToast={enableToast}
        resolvers={resolvers}
      />
    ),
  })

  await hooksAct(wait)

  return result
}

const customRender = async (
  node: ReactNode,
  options?: {
    waitForLoad?: boolean
    enableToast?: boolean
    resolvers?: IMocks
  }
) => {
  const waitForLoad = options?.waitForLoad ?? false
  const enableToast = options?.enableToast ?? false
  const resolvers = options?.resolvers

  if (enableToast) {
    // Toast uses setTimeout under the hood
    jest.useFakeTimers('modern')
  }

  const { rerender, ...rest } = render(
    <Context node={node} enableToast={enableToast} resolvers={resolvers} />
  )

  if (enableToast) {
    // Make toast timers finish
    act(() => {
      jest.runAllTimers()
    })

    // For apollo provider otherwise test hangs on await
    jest.useRealTimers()
  }

  if (!waitForLoad) {
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

export const nockBack = nock.back

export async function renderWithNockBack(
  component: ReactNode,
  nockBackName: string
) {
  const { nockDone, context } = await nockBack(nockBackName)

  const Component = () => <>{component}</>

  const { container } = await customRender(<Component />)

  // If no nockback is pre-generated we need to await the fetch call
  !context.isLoaded && (await wait(5000))

  return { nockDone, container }
}

// re-export everything
export * as reactHooks from '@testing-library/react-hooks'
// @ts-ignore
export * from '@testing-library/react'

// override render method
export { customRender as render }
export { customRenderHook as renderHook }

export { customFireEvent as fireEvent }
