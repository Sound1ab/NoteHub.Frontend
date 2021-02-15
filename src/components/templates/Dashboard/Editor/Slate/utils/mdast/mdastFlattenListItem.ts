import { Node as SlateNode } from 'slate'
import { Node } from 'unist'
import visit from 'unist-util-visit'

interface IListItemNode extends Node {
  children: [SlateNode]
}

export function flattenListItemParagraphs() {
  // eslint-disable-next-line
  return (ast: any) => {
    // @ts-ignore
    visit<IListItemNode>(ast, 'listItem' as never, (listItem) => {
      if (
        listItem.children.length === 1 &&
        listItem.children[0].type === 'paragraph'
      ) {
        // @ts-ignore
        listItem.children = listItem.children[0].children
      }
      return listItem
    })
    return ast
  }
}
