import { Editor, Element, Point, Range, Transforms } from 'slate'

const SHORTCUTS: Record<string, { type: string; depth?: number }> = {
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
}

export function withShortcuts(editor: Editor) {
  const { deleteBackward, insertText } = editor

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

      const element = SHORTCUTS[beforeText]

      if (element) {
        Transforms.select(editor, range)
        Transforms.delete(editor)
        Transforms.setNodes(editor, element, {
          match: (n) => Editor.isBlock(editor, n),
        })

        if (element.type === 'listItem') {
          const list = { type: 'list', ordered: false, children: [] }
          Transforms.wrapNodes(editor, list, {
            match: (n) =>
              !Editor.isEditor(n) &&
              Element.isElement(n) &&
              n.type === 'listItem',
          })
        }

        if (element.type === 'thematicBreak') {
          Transforms.insertNodes(editor, {
            type: 'paragraph',
            children: [{ text: '' }],
          })
        }

        return
      }
    }

    insertText(text)
  }

  editor.deleteBackward = (...args) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      })

      if (match) {
        const [block, path] = match
        const start = Editor.start(editor, path)

        if (
          !Editor.isEditor(block) &&
          Element.isElement(block) &&
          block.type !== 'paragraph' &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties: Partial<Element> = {
            type: 'paragraph',
          }
          Transforms.setNodes(editor, newProperties)

          if (block.type === 'listItem') {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                !Editor.isEditor(n) &&
                Element.isElement(n) &&
                n.type === 'list',
              split: true,
            })
          }

          return
        }
      }

      deleteBackward(...args)
    }
  }

  return editor
}
