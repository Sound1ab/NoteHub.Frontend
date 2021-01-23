import { atom, useRecoilState } from 'recoil'

const lightThemeState = atom({
  key: 'lightTheme',
  default: false,
})

export const useLightTheme = () => useRecoilState(lightThemeState)
