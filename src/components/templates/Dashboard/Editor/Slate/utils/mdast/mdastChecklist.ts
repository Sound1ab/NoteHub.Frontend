import { Literal, Node } from 'unist'
import visit from 'unist-util-visit'

interface INode extends Node {
  children: Literal[]
}

export function mdastChecklist() {
  // eslint-disable-next-line
  return (ast: any) => {
    // @ts-ignore
    visit<INode>(ast, 'list' as never, (list) => {
      const isChecklist = list.children.some(
        (node) => node.checked !== null && node.checked !== undefined
      )

      if (isChecklist) {
        list.type = 'checklist'
      }

      return list
    })
    return ast
  }
}
