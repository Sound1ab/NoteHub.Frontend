import { atom, useRecoilState } from 'recoil'

const repeatedWordsState = atom({
  key: 'repeatedWords',
  default: false,
})

export const useRepeatedWords = () => useRecoilState(repeatedWordsState)
