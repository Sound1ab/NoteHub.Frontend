import { Literal, Node } from 'unist'
import visit from 'unist-util-visit'

interface INode extends Node {
  children: Literal[]
}

export function mdastChecklistItem() {
  // eslint-disable-next-line
  return (ast: any) => {
    // @ts-ignore
    visit<INode>(ast, 'listItem' as never, (listItem) => {
      const isChecklistItem =
        listItem.checked !== null && listItem.checked !== undefined

      if (isChecklistItem) {
        listItem.type = 'checklistItem'
      }

      return listItem
    })
    return ast
  }
}
