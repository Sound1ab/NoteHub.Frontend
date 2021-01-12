import { Node_Type } from '../../components/apollo/generated_components_typings'
import { files } from '../../schema/mockData'
import { createNodes } from '../createNodes'

export function getMockNodes() {
  const nodes = createNodes(files, new Set())

  const [folderNode] = nodes.filter((node) => node.type === Node_Type.Folder)

  const [fileNode] = nodes.filter((node) => node.type === Node_Type.File)

  return { fileNode, folderNode }
}
