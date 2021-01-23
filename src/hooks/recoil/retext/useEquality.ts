import { atom, useRecoilState } from 'recoil'

const equalityState = atom({
  key: 'equality',
  default: false,
})

export const useEquality = () => useRecoilState(equalityState)
