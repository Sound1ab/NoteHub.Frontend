export interface ITreeNode {
  name: string
  toggled: boolean
  path: string
  type: string
  children?: ITreeNode[]
}
