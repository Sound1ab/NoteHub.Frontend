import * as React from 'react'
import { render } from 'react-testing-library'
import { ThemeProvider } from './components/utility'

const customRender = (node: any, ...options: any[]) =>
  render(<ThemeProvider>{node}</ThemeProvider>, ...options)

// re-export everything
export * from 'react-testing-library'

// override render method
export { customRender as render }
