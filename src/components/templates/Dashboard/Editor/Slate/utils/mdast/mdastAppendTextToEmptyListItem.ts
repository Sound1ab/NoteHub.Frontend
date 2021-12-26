import { Literal, Node } from 'unist'
import visit from 'unist-util-visit'

interface IListItemNode extends Node {
  children: Literal[]
}

export function mdastAppendTextToEmptyListItem() {
  // eslint-disable-next-line
  return (ast: any) => {
    // @ts-ignore
    visit<IListItemNode>(ast, 'listItem' as never, (listItem) => {
      if (listItem.children.length === 0) {
        listItem.children.push({
          type: 'text',
          value: '',
        })
      }
      return listItem
    })
    return ast
  }
}
