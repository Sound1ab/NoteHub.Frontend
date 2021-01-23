import { atom, useRecoilState } from 'recoil'

const spellingState = atom({
  key: 'spelling',
  default: false,
})

export const useSpelling = () => useRecoilState(spellingState)
