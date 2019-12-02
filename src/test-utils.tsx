import React from 'react'
import { render } from '@testing-library/react'
import {
  ThemeProvider,
  IconProvider,
  ApolloProvider,
} from './components/utility'

jest.mock('react', () => {
  const originalModule = jest.requireActual('react')

  return {
    ...originalModule,
    useContext: () => ({
      colorMode: 'dark',
    }),
  }
})

const customRender = (node: any, ...options: any[]) =>
  render(
    <ApolloProvider>
      <ThemeProvider>{() => <IconProvider>{node}</IconProvider>}</ThemeProvider>
    </ApolloProvider>,
    ...options
  )

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
