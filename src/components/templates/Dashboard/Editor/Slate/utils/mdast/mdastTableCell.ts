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

        // Fix for when a tableCell has no text. Manually insert some empty
        // text otherwise markdown can't be converted to slate value
        if (tableCell.children.length === 0) {
          tableCell.children.push({
            type: 'text',
            value: '',
          })
        }

        return tableCell
      }
    )
    return ast
  }
}
