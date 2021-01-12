import { atom, useRecoilState } from 'recoil'
import { EditorFromTextArea } from 'codemirror'

const editorState = atom<EditorFromTextArea | null>({
  key: 'editor',
  default: null,
})

export const useEditor = () => useRecoilState(editorState)
