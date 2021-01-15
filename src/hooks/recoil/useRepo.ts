import { atom, useRecoilState } from 'recoil'

const repoState = atom({
  key: 'repo',
  default: 'https://github.com/Sound1ab/Notes.git',
})

export const useRepo = () => useRecoilState(repoState)
