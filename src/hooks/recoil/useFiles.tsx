import { atom, useRecoilState } from 'recoil'

import { IGitTreeNode } from '../../services/git/types'

const filesState = atom<IGitTreeNode[]>({
  key: 'files',
  default: [],
})

export const useFiles = () => useRecoilState(filesState)
