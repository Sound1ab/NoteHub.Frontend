import { atom, useRecoilState } from 'recoil'

const openFoldersState = atom<Set<string>>({
  key: 'openFolders',
  default: new Set([]),
})

export const useOpenFolders = () => useRecoilState(openFoldersState)
