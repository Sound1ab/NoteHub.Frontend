import { atom, useRecoilState } from 'recoil'

const activePathState = atom({
  key: 'activePath',
  default: '',
})

export const useActivePath = () => useRecoilState(activePathState)
