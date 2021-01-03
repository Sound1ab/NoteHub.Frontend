import { Node_Type } from '../components/apollo/generated_components_typings'

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

interface IPoint {
  offset: number
}

interface ILocation {
  start?: IPoint
  end?: IPoint
}

export interface IMessage {
  message?: string
  name?: string
  reason?: string
  line?: number
  column?: number
  location?: ILocation
  actual?: number
  source?: string
  ruleId?: string
  fatal?: boolean
}

export interface IFile {
  path: string
  content: string
}
