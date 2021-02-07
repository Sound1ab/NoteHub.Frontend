import { Editor, Element, Point, Range } from 'slate'

export function withTables(editor: Editor) {
  const { deleteBackward, deleteForward, insertBreak } = editor

  editor.deleteBackward = (unit) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      // Get the cell content and path
      const [cell] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === 'tableCell',
      })

      if (cell) {
        const [, cellPath] = cell
        // If we're in a cell check to see if the cursor is at the start
        const start = Editor.start(editor, cellPath)

        // If the cursor is at the start, don't so anything
        if (Point.equals(selection.anchor, start)) {
          return
        }
      }
    }

    deleteBackward(unit)
  }

  // Same as the above but for forward delete
  editor.deleteForward = (unit) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === 'tableCell',
      })

      if (cell) {
        const [, cellPath] = cell
        const end = Editor.end(editor, cellPath)

        if (Point.equals(selection.anchor, end)) {
          return
        }
      }
    }

    deleteForward(unit)
  }

  // Checks to see if we're in a table cell and cancel the enter action if we are
  editor.insertBreak = () => {
    const { selection } = editor

    if (selection) {
      const [table] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === 'table',
      })

      if (table) {
        return
      }
    }

    insertBreak()
  }

  return editor
}
