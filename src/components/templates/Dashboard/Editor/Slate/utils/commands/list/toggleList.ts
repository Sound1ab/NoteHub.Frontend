import { Editor, Node, NodeEntry, Path, Range, Transforms } from 'slate'

import { getItemDepth } from '../../helpers/list/getItemDepth'
import { getItemsAtRange } from '../../helpers/list/getItemsAtRange'
import { getTopmostItemsAtRange } from '../../helpers/list/getTopmostItemsAtRange'
import { isItem } from '../../helpers/list/isItem'
import { isListOrItem } from '../../helpers/list/isListOrItem'
import { decreaseItemDepth } from './decreaseItemDepth'
import { unwrapList } from './unwrapList'
import { wrapInList } from './wrapInList'

const allItemsOnSameLevel = (nodeEntries: Array<NodeEntry>): boolean => {
  if (nodeEntries.length === 0) {
    return true
  }

  const referenceDepth = nodeEntries[0][1].length

  return !nodeEntries.some(
    ([, nodeEntryPath]) => nodeEntryPath.length !== referenceDepth
  )
}

const isListItemAfterTheFirstItem = (
  listItemPath: Path,
  closestListItem?: NodeEntry
) => {
  if (closestListItem) {
    return !Path.isAncestor(listItemPath, closestListItem[1])
  }

  return true
}

const unwrapAllItemsInSelection = (
  editor: Editor,
  listItemsInSelection: Array<NodeEntry>
) => {
  const listItemPathRefs = listItemsInSelection.map(([, listItemPath]) =>
    Editor.pathRef(editor, listItemPath)
  )

  // move items leftmost, start from the end so only one item is affected
  Editor.withoutNormalizing(editor, () => {
    listItemPathRefs.reverse().forEach((listItemPathRef) => {
      if (!Path.isPath(listItemPathRef) || !listItemPathRef.current) return

      while (getItemDepth(editor, listItemPathRef.current) > 1) {
        decreaseItemDepth(editor, listItemPathRef.current)
      }
    })
  })

  if (
    !listItemPathRefs[0].current ||
    !listItemPathRefs[listItemPathRefs.length - 1].current
  )
    return

  const listItemsRange = Editor.range(
    editor,
    listItemPathRefs[0].current,
    listItemPathRefs[listItemPathRefs.length - 1].current as any
  )

  Transforms.select(editor, listItemsRange)
  unwrapList(editor)

  listItemPathRefs.forEach((listItemPathRef) => listItemPathRef.unref())
}

/**
 * Toggle list on the selected range.
 */
export const toggleList = (editor: Editor, ...newListOptions: any): void => {
  const range = editor.selection

  if (!range) return

  const [startElement, startElementPath] = Editor.parent(
    editor,
    Range.start(range)
  )
  const [endElement, endElementPath] = Editor.parent(editor, Range.end(range))

  const singleElementInSelection = startElement === endElement
  if (singleElementInSelection) {
    if (getTopmostItemsAtRange(editor).length > 0) {
      unwrapList(editor)
    } else {
      wrapInList(editor, ...newListOptions)
    }
    return
  }

  const firstImmediateListItemInSelection = Editor.above(editor, {
    at: Range.start(range),
    match: isItem,
  })
  // filter is necessary since getting all items at range
  // includes the leftmost item in deeply nested lists
  // which doesn't actually feel or seem (UX) like it's part of the selection
  const listItemsInSelection = getItemsAtRange(
    editor
  ).filter(([, listItemPath]) =>
    isListItemAfterTheFirstItem(listItemPath, firstImmediateListItemInSelection)
  )

  const noItemsInSelection = listItemsInSelection.length === 0
  if (noItemsInSelection) {
    wrapInList(editor, ...newListOptions)
    return
  }

  if (allItemsOnSameLevel(listItemsInSelection)) {
    unwrapList(editor)
    return
  }

  const ancestorPath = Path.common(startElementPath, endElementPath)
  const ancestor = Node.get(editor, ancestorPath)
  if (!isListOrItem(ancestor)) {
    unwrapList(editor)
  }

  unwrapAllItemsInSelection(editor, listItemsInSelection)
}
