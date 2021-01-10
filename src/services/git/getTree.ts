import { TREE, walk } from 'isomorphic-git'

import { Node_Type } from '../../components/apollo/generated_components_typings'
import { fs } from '../lightningFS'
import { IGitTreeNode } from './types'

export interface IGetTree {
  optimisticPaths: string[]
  dir: string
}

export async function getTree({
  dir,
  optimisticPaths,
}: IGetTree): Promise<IGitTreeNode[]> {
  const trees = [TREE({ ref: 'HEAD' })]

  return await walk({
    fs,
    dir,
    trees,
    map: async (filepath, entries) => {
      if (!entries || entries.length === 0) {
        return
      }

      const [entry] = entries

      const type = await entry.type()

      if (type === 'commit' || type === 'special') {
        return
      }

      let gitHubType

      switch (type) {
        case 'blob':
          gitHubType = Node_Type.File
          break
        case 'tree':
          gitHubType = Node_Type.Folder
          break
      }

      return {
        path: filepath,
        isOptimistic: optimisticPaths.includes(filepath),
        type: gitHubType,
      }
    },
  })
}
