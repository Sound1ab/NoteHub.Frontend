import { Editor, Element, Point, Range, Transforms } from 'slate'

import { ParagraphElement } from '../../SlateTypes'

export const withChecklists = (editor: Editor) => {
  const { deleteBackward } = editor

  editor.deleteBackward = (...args) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const [match] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) && Element.isElementType(n, 'checklist'),
      })

      if (match) {
        const [, path] = match
        const start = Editor.start(editor, path)

        if (Point.equals(selection.anchor, start)) {
          const paragraphElement: Partial<ParagraphElement> = {
            type: 'paragraph',
          }

          // Change top level checklist node to a paragraph
          Transforms.setNodes(editor, paragraphElement, {
            match: (n) =>
              !Editor.isEditor(n) && Element.isElementType(n, 'checklist'),
          })

          // Remove child nodes of checklist
          Transforms.removeNodes(editor, {
            at: start,
            match: (n, path) => !Editor.isEditor(n) && path.length === 2,
          })

          // Move the cursor to the start of the new paragraph
          Transforms.setSelection(editor, { anchor: start })

          return
        }
      }
    }

    deleteBackward(...args)
  }

  return editor
}
