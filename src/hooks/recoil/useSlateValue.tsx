import { atom, useRecoilState } from 'recoil'
import { Node } from 'slate'

const slateValueState = atom<Node[]>({
  key: 'slateValue',
  default: [],
})

export const useSlateValue = () => useRecoilState(slateValueState)
