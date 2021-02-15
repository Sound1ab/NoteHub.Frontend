import { Node as SlateNode } from 'slate'
import { Node } from 'unist'
import visit from 'unist-util-visit'

interface INode extends Node {
  children: SlateNode[]
}

export function mdastTableHeader() {
  // eslint-disable-next-line
  return (ast: any) => {
    // @ts-ignore
    visit<INode>(
      ast,
      'tableRow' as never,
      // @ts-ignore
      (tableRow, index, parent) => {
        if (index === 0) {
          tableRow.header = true
        }

        if (index === (parent?.children.length ?? 0) - 1) {
          tableRow.footer = true
        }

        return tableRow
      }
    )
    return ast
  }
}
