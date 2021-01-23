import { atom, useRecoilState } from 'recoil'

const fullWidthState = atom({
  key: 'fullWidth',
  default: false,
})

export const useFullWidth = () => useRecoilState(fullWidthState)
