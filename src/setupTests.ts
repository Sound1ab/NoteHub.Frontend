import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

import { cleanup } from '@testing-library/react'
import fetch from 'node-fetch'

require('fake-indexeddb/auto')

afterEach(cleanup)

globalThis.fetch = fetch

jest.mock('./utils/scrollIntoView')
jest.mock('react-use-upload', () => ({
  useUpload: jest.fn(
    (file: File | null, { getUrl }: { getUrl: () => void }) => {
      getUrl()

      return file
        ? {
            progress: 100,
            done: true,
          }
        : {
            progress: 0,
            done: false,
          }
    }
  ),
}))
jest.mock('./hooks/image/useCreateSignedUrl')
// jest.mock('./services/retext/process', () => ({
//   process: jest.fn(() => []),
// }))
jest.mock('./utils/debounce')
jest.mock('./utils/css/darken')
jest.mock('./hooks/fs/useFs')
jest.mock('./hooks/git/useGit')

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

if (typeof globalThis.TextEncoder === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { TextEncoder, TextDecoder } = require('util')
  globalThis.TextEncoder = TextEncoder
  globalThis.TextDecoder = TextDecoder
}
