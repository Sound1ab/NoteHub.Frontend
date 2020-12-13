import { Node_Type } from '../components/apollo'

export interface IPosition {
  ch: number
  line: number
  sticky?: string
  __typename?: 'Position'
}

export interface IFileNode {
  id: string
  name: string
  path: string
  type: Node_Type
  isOptimistic: boolean
}

export interface IFolderNode {
  id: string
  name: string
  toggled: boolean
  path: string
  type: Node_Type
  children: ITreeNode[]
  isOptimistic: boolean
}

export type ITreeNode = IFileNode | IFolderNode
