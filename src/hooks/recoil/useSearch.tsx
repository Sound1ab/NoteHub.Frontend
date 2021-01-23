import { atom, useRecoilState } from 'recoil'

const searchState = atom<string>({
  key: 'search',
  default: '',
})

export const useSearch = () => useRecoilState(searchState)
