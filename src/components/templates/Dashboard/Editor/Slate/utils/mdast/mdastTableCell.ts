import { Literal, Node } from 'unist'
import visit from 'unist-util-visit'

interface INode extends Node {
  children: Literal[]
}

export function mdastTableCell() {
  // eslint-disable-next-line
  return (ast: any) => {
    // @ts-ignore
    visit<INode>(
      ast,
      'tableCell' as never,
      // @ts-ignore
      (tableCell, index, parent) => {
        if (parent?.header) {
          tableCell.header = true
        }

        return tableCell
      }
    )
    return ast
  }
}
