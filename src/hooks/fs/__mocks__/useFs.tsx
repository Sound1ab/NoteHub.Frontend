import { Node_Type } from '../../../components/apollo/generated_components_typings'

export function useFs() {
  return [
    {
      readFile: jest.fn(() => ({
        path: 'MOCK_PATH.md',
        isOptimistic: false,
        type: Node_Type.File,
      })),
      writeFile: jest.fn(),
      listFiles: jest.fn(() => [
        { path: 'MOCK_PATH.md', isOptimistic: false, type: Node_Type.File },
      ]),
    },
    { loading: false },
  ]
}
