export interface IPosition {
  ch: number
  line: number
  sticky?: string
  __typename?: 'Position'
}

export interface ITreeNode {
  name: string
  toggled: boolean
  path: string
  type: string
  children?: ITreeNode[]
  isOptimistic: boolean
}
