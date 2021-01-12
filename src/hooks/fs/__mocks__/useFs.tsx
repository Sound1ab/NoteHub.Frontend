import { Node_Type } from '../../../components/apollo/generated_components_typings'

let mockIndexedDB: Record<string, string> = {
  'MOCK_FOLDER_PATH/MOCK_FILE_PATH_1.md': '',
  'MOCK_FOLDER_PATH/MOCK_FILE_PATH_2.md': 'MOCK FILE CONTENT',
  'MOCK_FOLDER_PATH/MOCK_FILE_PATH_4.md': '',
  'MOCK_FILE_PATH_3.md': 'MOCK FILE CONTENT',
}

// beforeEach(() => {
//   mockIndexedDB = {
//     'MOCK_FOLDER_PATH/MOCK_FILE_PATH_1.md': '',
//     'MOCK_FOLDER_PATH/MOCK_FILE_PATH_2.md': 'MOCK FILE CONTENT',
//     'MOCK_FOLDER_PATH/MOCK_FILE_PATH_4.md': '',
//     'MOCK_FILE_PATH_3.md': 'MOCK FILE CONTENT',
//   }
// })

export function useFs() {
  return [
    {
      readFile: jest.fn((path: string) => {
        console.log('path', path)
        console.log('mockIndexedDB', mockIndexedDB)
        console.log('resolve', mockIndexedDB[path])
        return Promise.resolve(mockIndexedDB[path])
      }),
      writeFile: jest.fn((path: string, content: string) => {
        mockIndexedDB[path] = content
      }),
      rename: jest.fn((oldPath: string, newPath: string) => {
        const content = mockIndexedDB[oldPath]
        delete mockIndexedDB[oldPath]
        mockIndexedDB[newPath] = content
      }),
      unlink: jest.fn((path: string) => {
        delete mockIndexedDB[path]
      }),
      readDirRecursive: jest.fn(() =>
        Object.keys(mockIndexedDB).map((key) => ({
          path: key,
          type: Node_Type.File,
          isOptimistic: false,
        }))
      ),
    },
    { loading: false, error: null },
  ]
}
