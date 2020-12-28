import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

import { cleanup } from '@testing-library/react'

afterEach(cleanup)

jest.mock('./services/retext/process', () => ({
  process: jest.fn(() => []),
}))

jest.mock('./utils/debounce', () => ({
  debounce: (fn: () => void) => fn,
}))

jest.mock('./utils/css/darken', () => ({
  darken: jest.fn(() => '#000'),
}))

// Mocking out for codemirror as JSDOM doesn't do this
// @ts-ignore
global.document.createRange = () => {
  return {
    setEnd: jest.fn(),
    setStart: jest.fn(),
    getBoundingClientRect: function () {
      return { right: 0 }
    },
    getClientRects: function () {
      return {
        length: 0,
        left: 0,
        right: 0,
      }
    },
  }
}
