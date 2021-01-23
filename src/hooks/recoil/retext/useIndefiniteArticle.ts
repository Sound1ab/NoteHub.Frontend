import { atom, useRecoilState } from 'recoil'

const indefiniteArticleState = atom({
  key: 'indefiniteArticle',
  default: false,
})

export const useIndefiniteArticle = () => useRecoilState(indefiniteArticleState)
