import { atom, useRecoilState } from 'recoil'

import { FONT } from '../../../enums'

const fontState = atom<FONT>({
  key: 'font',
  default: FONT.IS_DEFAULT,
})

export const useFont = () => useRecoilState(fontState)
