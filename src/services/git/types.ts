import { Node_Type } from '../../components/apollo/generated_components_typings'

export interface IGitTreeNode {
  path: string
  isOptimistic: boolean
  type: Node_Type
}
