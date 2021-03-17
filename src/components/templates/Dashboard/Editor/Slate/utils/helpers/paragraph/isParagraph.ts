import { Element, Node } from 'slate'

export function isParagraph(node: Node) {
  return Element.isElement(node) && node.type === 'text'
}
