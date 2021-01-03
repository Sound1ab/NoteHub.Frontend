import { atom, useRecoilState } from 'recoil'

const fileContentState = atom({
  key: 'fileContent',
  default: '',
})

export const useFileContent = () => useRecoilState(fileContentState)
