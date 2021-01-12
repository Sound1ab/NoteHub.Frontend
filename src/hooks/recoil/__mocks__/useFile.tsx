import { atom, useRecoilState } from 'recoil'
import { IFile } from '../../types'

const fileState = atom<IFile | null>({
  key: 'file',
  default: null,
})

export const useFile = () => useRecoilState(fileState)
