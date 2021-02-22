import { Editor, Element, Point, Range, Transforms } from 'slate'

export function withLinks(editor: Editor) {
  const { deleteBackward, insertBreak } = editor

  editor.deleteBackward = (unit) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      // Get the cell content and path
      const [listItem] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === 'listItem',
      })

      if (listItem) {
        const [, listItemPath] = listItem
        // If we're in a cell check to see if the cursor is at the start
        const start = Editor.start(editor, listItemPath)

        // If the cursor is at the start, remove the node
        if (Point.equals(selection.anchor, start)) {
          Transforms.removeNodes(editor, { at: listItemPath })
          return
        }
      }
    }

    deleteBackward(unit)
  }

  editor.insertBreak = () => {
    const { selection } = editor

    if (selection) {
      const [listItem] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === 'listItem',
      })

      if (listItem) {
        const [, listItemPath] = listItem
        // If we're in a cell check to see if the cursor is at the start
        const start = Editor.start(editor, listItemPath)

        // If the cursor is at the start turn list item into paragraph and
        // lift out of ul
        if (Point.equals(selection.anchor, start)) {
          Transforms.setNodes(
            editor,
            { type: 'paragraph' },
            { at: listItemPath }
          )
          Transforms.liftNodes(editor, { at: listItemPath })
          return
        }
      }
    }

    insertBreak()
  }

  return editor
}
