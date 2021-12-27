import { Editor, Element, Transforms } from 'slate'

/**
 * Split a list item at the start of the current range.
 */
export const splitChecklistItem = (editor: Editor): void =>
  Transforms.splitNodes(editor, {
    match: (n) => Element.isElementType(n, 'checklistItem'),
    always: true,
  })
