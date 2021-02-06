import { Node as SlateNode } from 'slate'
import { Node } from 'unist'
import visit from 'unist-util-visit'

interface IListItemNode extends Node {
  children: SlateNode[]
}

// this doesn't work for some reason
export function mdastAppendTextToEmptyListItem() {
  return (ast: any) => {
    // @ts-ignore
    visit<IListItemNode>(ast, 'listItem' as any, (listItem) => {
      if (listItem.children.length === 0) {
        // @ts-ignore
        listItem = null
      }
      return listItem
    })
    return ast
  }
}
