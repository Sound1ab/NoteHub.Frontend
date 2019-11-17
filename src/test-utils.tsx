import React from 'react'
import { render } from 'react-testing-library'
import { ThemeProvider } from './components/utility/ThemeProvider/ThemeProvider'

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
  render(<ThemeProvider>{() => node}</ThemeProvider>, ...options)

// re-export everything
export * from 'react-testing-library'

// override render method
export { customRender as render }
