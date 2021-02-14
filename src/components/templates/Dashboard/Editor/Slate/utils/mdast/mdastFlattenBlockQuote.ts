import { Node as SlateNode } from 'slate'
import { Node } from 'unist'
import visit from 'unist-util-visit'

interface INode extends Node {
  children: [SlateNode]
}

export function mdastFlattenBlockQuote() {
  return (ast: any) => {
    // @ts-ignore
    visit<INode>(ast, 'blockquote' as never, (blockquote) => {
      if (
        blockquote.children.length === 1 &&
        blockquote.children[0].type === 'paragraph'
      ) {
        // @ts-ignore
        blockquote.children = blockquote.children[0].children
      }
      return blockquote
    })
    return ast
  }
}
