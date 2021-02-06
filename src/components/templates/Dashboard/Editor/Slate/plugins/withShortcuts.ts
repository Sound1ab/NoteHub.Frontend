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
      const { anchor } = selection
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      })
      const path = block ? block[1] : []
      const start = Editor.start(editor, path)
      const range = { anchor, focus: start }
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
          Editor.insertBreak(editor)
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
