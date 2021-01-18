import { atom, useRecoilState } from 'recoil'

const repoState = atom({
  key: 'repo',
  default: `https://github.com/${process.env.REACT_APP_REPO}`,
})

export const useRepo = () => useRecoilState(repoState)
