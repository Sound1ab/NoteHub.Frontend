import { Editor, Point, Range, Transforms } from 'slate'

import { isInlineActive } from '../helpers/isInlineActive'

export function inlineCodeCursorBehaviour(editor: Editor) {
  if (!isInlineActive(editor, 'inlineCode')) return

  const { selection } = editor

  if (!selection || !Range.isCollapsed(selection)) return

  // Selection is the position of the cursor
  // Focus and anchor are both Points
  // Point offset = position of cursor within leaf
  // Point path[0] = line of the block within editor
  // Point path[1] = leaf position within the block
  const {
    focus,
    anchor: { path, offset },
  } = selection

  // Get end point of the leaf at path position
  const end = Editor.end(editor, path)

  // Detect if current selection position is at the end of the leaf
  const cursorIsAtEndOfInlineCode = Point.isAfter(
    { path, offset },
    { ...end, offset: end.offset - 1 }
  )

  if (!cursorIsAtEndOfInlineCode) return

  const block = Editor.above(editor, {
    match: (n) => Editor.isBlock(editor, n),
  })

  if (!block) return

  const [{ children }] = block

  const numberOfChildren = children.length

  // Check if we're in the last leaf, if we are we will need to create
  //  a new node, otherwise we want to place the cursor into the next node
  const isLastChildInBlock = path[path.length - 1] === numberOfChildren - 1

  // To update cursor position we need to know the line and leaf position
  const { path: cursorPath } = focus

  if (isLastChildInBlock) {
    const text = { text: ' ', bold: false, italic: false, inlineCode: false }

    // Insert new text node after selection leaf
    Transforms.insertNodes(editor, text, { at: end })
  }

  // Get the position of the current element within its block
  const leafPosition = cursorPath[cursorPath.length - 1]

  if (!leafPosition) return

  // New position will be on the same line but after the current leaf
  const textPath = [...cursorPath.slice(0, -1), leafPosition + 1]

  // Place cursor at the start of the next leaf
  const point: Point = { offset: 0, path: textPath }

  Transforms.setSelection(editor, {
    focus: point,
    anchor: point,
  })
}
