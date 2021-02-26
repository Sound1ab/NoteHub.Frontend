import { Editor } from 'slate'

import { joinAdjacentLists } from '../normalizers/list/joinAdjacentLists'

export function withLists(editor: Editor) {
  joinAdjacentLists(editor)
  return editor
}
