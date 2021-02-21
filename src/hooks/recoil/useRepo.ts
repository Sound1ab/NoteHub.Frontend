import { atom, useRecoilState } from 'recoil'

const repoState = atom({
  key: 'repo',
  default: '',
})

export const useRepo = () => useRecoilState(repoState)
