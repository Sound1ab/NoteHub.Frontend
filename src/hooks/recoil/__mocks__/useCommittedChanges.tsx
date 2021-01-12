import { atom, useRecoilState } from 'recoil'

const committedChangesState = atom<string[]>({
  key: 'committedChanges',
  default: [],
})

export const useCommittedChanges = () => useRecoilState(committedChangesState)
