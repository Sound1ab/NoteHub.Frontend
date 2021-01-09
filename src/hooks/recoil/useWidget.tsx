import { atom, useRecoilState } from 'recoil'

interface IWidget {
  coords: { left: number; right: number; top: number; bottom: number }
  message: string
}

const widgetState = atom<IWidget | null>({
  key: 'widget',
  default: null,
})

export const useWidget = () => useRecoilState(widgetState)
