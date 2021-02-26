import { Editor, Node, NodeEntry, Path, Range } from 'slate'

import { getCurrentItem } from './getCurrentItem'
import { isItem } from './isItem'
import { isList } from './isList'

const takeOnlyDirectChildren = (ancestorPath: Path) => ([
  ,
  listItemPath,
]: NodeEntry<Node>) => listItemPath.length === ancestorPath.length + 1

/**
 * Return the array of items at the given range. The returned items are
 * the highest list item blocks that cover the range.
 *
 * Returns an empty array if no list of items can cover the range
 */
export const getTopmostItemsAtRange = (
  editor: Editor,
  range?: Range | null
) => {
  range = range || editor.selection

  if (!range) {
    return []
  }

  const [startElement, startElementPath] = Editor.parent(
    editor,
    Range.start(range)
  )
  const [endElement, endElementPath] = Editor.parent(editor, Range.end(range))

  if (startElement === endElement) {
    const item = getCurrentItem(editor, startElementPath)
    return item ? [item] : []
  }

  let ancestorPath = Path.common(startElementPath, endElementPath)
  let ancestor = Node.get(editor, ancestorPath)

  if (Editor.isEditor(ancestor)) {
    const topMostLists = [
      ...Editor.nodes(editor, {
        at: range,
        match: isList,
        mode: 'highest',
      }),
    ]

    return topMostLists.reduce((items, [, listPath]) => {
      const topMostListItems = [
        ...Editor.nodes(editor, {
          at: listPath,
          match: isItem,
          mode: 'highest',
        }),
      ]

      return items.concat(topMostListItems)
    }, [] as NodeEntry<Node>[])
  }

  while (ancestorPath.length !== 0) {
    if (isList(ancestor)) {
      return [
        ...Editor.nodes(editor, {
          at: range,
          match: isItem,
        }),
        // We want only the children of the ancestor
        // aka the topmost possible list items in the selection
      ].filter(takeOnlyDirectChildren(ancestorPath))
    } else if (isItem(ancestor)) {
      // The ancestor is the highest list item that covers the range
      return [[ancestor, ancestorPath]]
    }

    ancestorPath = ancestorPath.slice(0, -1)
    ancestor = Node.get(editor, ancestorPath)
  }

  // No list of items can cover the range
  return []
}
