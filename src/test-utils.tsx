import React from 'react'
import { render } from 'react-testing-library'
import { ThemeProvider, IconProvider } from './components/utility'

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
    <ThemeProvider>{() => <IconProvider>{node}</IconProvider>}</ThemeProvider>,
    ...options
  )

// re-export everything
export * from 'react-testing-library'

// override render method
export { customRender as render }
