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

jest.mock('./hooks/fs/useFs')
jest.mock('./hooks/git/useGit')
// jest.mock('./hooks/recoil/useActivePath')
// jest.mock('./hooks/recoil/useCommittedChanges')
// jest.mock('./hooks/recoil/useFile')
// jest.mock('./hooks/recoil/useFileContent')
// jest.mock('./hooks/recoil/useFiles')
// jest.mock('./hooks/recoil/useOpenFolders')
// jest.mock('./hooks/recoil/useTabs')
// jest.mock('./hooks/recoil/useUnstagedChanges')
// jest.mock('./hooks/recoil/useWidget')

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
