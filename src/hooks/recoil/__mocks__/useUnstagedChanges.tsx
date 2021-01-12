import { atom, useRecoilState } from 'recoil'

const unstagedChangesState = atom<string[]>({
  key: 'unstagedChanges',
  default: [],
})

export const useUnstagedChanges = () => useRecoilState(unstagedChangesState)
