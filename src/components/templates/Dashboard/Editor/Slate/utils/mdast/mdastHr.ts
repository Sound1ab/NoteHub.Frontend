import { Literal, Node } from 'unist'
import visit from 'unist-util-visit'

interface INode extends Node {
  children: Literal[]
}

export function mdastHr() {
  // eslint-disable-next-line
  return (ast: any) => {
    // @ts-ignore
    visit<INode>(
      ast,
      'thematicBreak' as never,
      // @ts-ignore
      (thematicBreak, index, parent) => {
        const numberOfChildren = parent?.children.length ?? 0

        const isLastInDocument = index === numberOfChildren - 1

        const endOfDocumentPoint = parent?.position?.end

        if (isLastInDocument && endOfDocumentPoint) {
          const position = {
            start: endOfDocumentPoint,
            end: endOfDocumentPoint,
          }

          parent?.children.push({
            type: 'paragraph',
            children: [
              {
                type: 'text',
                value: '',
                position,
              },
            ],
            position,
          })
        }

        return thematicBreak
      }
    )
    return ast
  }
}
