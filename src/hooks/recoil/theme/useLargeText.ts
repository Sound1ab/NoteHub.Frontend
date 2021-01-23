import { atom, useRecoilState } from 'recoil'

const largeTextState = atom({
  key: 'largeText',
  default: false,
})

export const useLargeText = () => useRecoilState(largeTextState)
