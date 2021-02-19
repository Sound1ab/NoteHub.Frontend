import { atom, useRecoilState } from 'recoil'

const fileTreePathState = atom({
  key: 'fileTreePath',
  default: '',
})

export const useFileTreePath = () => useRecoilState(fileTreePathState)
