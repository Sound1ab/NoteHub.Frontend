import { atom, useRecoilState } from 'recoil'

const readabilityState = atom({
  key: 'readability',
  default: false,
})

export const useReadability = () => useRecoilState(readabilityState)
