import { Editor, Range, Transforms } from 'slate'

import { ChecklistElement } from '../../SlateTypes'
import { insertTableCell } from '../commands/table/insertTableCell'
import { insertTableRow } from '../commands/table/insertTableRow'
import { getCurrentItem } from '../helpers/list/getCurrentItem'

const SHORTCUTS = {
  '*': {
    type: 'listItem',
  },
  '-': {
    type: 'listItem',
  },
  '+': {
    type: 'listItem',
  },
  '>': {
    type: 'blockquote',
  },
  '#': {
    type: 'heading',
    depth: 1,
  },
  '##': {
    type: 'heading',
    depth: 2,
  },
  '###': {
    type: 'heading',
    depth: 3,
  },
  '####': {
    type: 'heading',
    depth: 4,
  },
  '#####': {
    type: 'heading',
    depth: 5,
  },
  '######': {
    type: 'heading',
    depth: 6,
  },
  hr: {
    type: 'thematicBreak',
  },
  '```': {
    type: 'code',
  },
  table: {
    type: 'table',
  },
  checklist: {
    type: 'checklistItem',
    checked: false,
  },
}

export function withShortcuts(editor: Editor) {
  const { insertText } = editor

  editor.insertText = (text) => {
    const { selection } = editor

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      // Get the position of the cursor
      const { anchor } = selection

      // Get nodes for the entire block
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      })

      // Get the path of the node
      const path = block ? block[1] : []

      // Get the Point of the start of the shortcut node
      const start = Editor.start(editor, path)

      // Get the range from the cursor to the start of the node
      const range = { anchor, focus: start }

      // Use range to extract the shortcut text
      const beforeText = Editor.string(editor, range)

      // @ts-ignore
      const element = SHORTCUTS[beforeText]

      if (element) {
        Transforms.select(editor, range)
        Transforms.delete(editor)

        if (element.type === 'checklistItem') {
          const list: ChecklistElement = {
            type: 'checklist' as const,
            ordered: false,
            children: [],
          }

          Transforms.setNodes(editor, list, {
            at: path,
            match: (n) => Editor.isBlock(editor, n),
          })

          Transforms.insertNodes(
            editor,
            {
              type: 'checklistItem',
              checked: false,
              children: [],
            },
            {
              at: [...path, 0],
            }
          )

          Transforms.insertNodes(
            editor,
            { type: 'paragraph', children: [] },
            { at: [...path, 0, 0] }
          )

          return
        }

        Transforms.setNodes(editor, element, {
          match: (n) => Editor.isBlock(editor, n),
        })

        if (element.type === 'listItem') {
          const list = { type: 'list' as const, ordered: false, children: [] }

          Transforms.wrapNodes(editor, list, {
            at: path,
          })

          const item = getCurrentItem(editor)

          if (!item) return

          const [, itemPath] = item

          Transforms.insertNodes(
            editor,
            { type: 'paragraph', children: [] },
            { at: [...itemPath, 0] }
          )
        }

        if (element.type === 'thematicBreak') {
          Transforms.insertNodes(editor, {
            type: 'paragraph',
            children: [
              { text: '', bold: false, italic: false, inlineCode: false },
            ],
          })
        }

        if (element.type === 'table') {
          const block = Editor.above(editor, {
            match: (n) => Editor.isBlock(editor, n),
          })

          if (!block) return
          ;[0, 1].forEach((position) => {
            insertTableRow({
              editor,
              header: position === 0,
              at: [...block[1], position],
            })
          })
          ;[
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
          ].forEach(([rowPosition, cellPosition]) => {
            insertTableCell({
              editor,
              header: rowPosition === 0,
              at: [...block[1], rowPosition, cellPosition],
            })
          })
        }

        return
      }
    }

    insertText(text)
  }

  return editor
}
