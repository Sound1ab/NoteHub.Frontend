import { Node_Type } from '../components/apollo/generated_components_typings'
import { IGitTreeNode } from '../services/git/types'

export const file = {
  path: 'MOCK_FOLDER_PATH/MOCK_FILE_PATH_4.md',
  type: Node_Type.File,
  isOptimistic: false,
}

export const files: IGitTreeNode[] = [
  {
    path: 'MOCK_FOLDER_PATH/MOCK_FILE_PATH_2.md',
    type: Node_Type.File,
    isOptimistic: false,
  },
  {
    path: 'MOCK_FOLDER_PATH/MOCK_FILE_PATH_1.md',
    type: Node_Type.File,
    isOptimistic: false,
  },
  {
    path: 'MOCK_FILE_PATH_3.md',
    type: Node_Type.File,
    isOptimistic: false,
  },
  file,
]
