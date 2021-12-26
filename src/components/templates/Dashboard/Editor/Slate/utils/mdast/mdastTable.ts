import { Literal, Node } from 'unist'
import visit from 'unist-util-visit'

interface INode extends Node {
  children: Literal[]
}

export function mdastTable() {
  // eslint-disable-next-line
  return (ast: any) => {
    // @ts-ignore
    visit<INode>(
      ast,
      'table' as never,
      // @ts-ignore
      (table, index, parent) => {
        const numberOfChildren = parent?.children.length ?? 0

        const isLastInDocument = index === numberOfChildren - 1

        const endOfDocumentPoint = parent?.position?.end

        const isNextChildATable = parent?.children[index + 1]?.type === 'table'

        const emptyParagraph = {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              value: '',
            },
          ],
        }

        if (isLastInDocument && endOfDocumentPoint) {
          // Insert empty paragraph after table if it's the last element in the
          // page so we can continue editing
          const position = {
            start: endOfDocumentPoint,
            end: endOfDocumentPoint,
          }

          parent?.children.push({
            ...emptyParagraph,
            children: [{ ...emptyParagraph.children[0], position }],
            position,
          })
        } else if (isNextChildATable) {
          // Insert empty paragraph between two tables otherwise we can't insert
          // anything there
          parent?.children.splice(index + 1, 0, emptyParagraph)
        }

        return table
      }
    )
    return ast
  }
}
