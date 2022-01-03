import { atom, useRecoilState } from 'recoil'
import { Descendant } from 'slate'

export const slateValueState = atom<Descendant[]>({
  key: 'slateValue',
  default: [],
})

export const useSlateValue = () => useRecoilState(slateValueState)
