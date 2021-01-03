import { atom, useRecoilState } from 'recoil'

const tabsState = atom<Set<string>>({
  key: 'tabs',
  default: new Set([]),
})

export const useTabs = () => useRecoilState(tabsState)
