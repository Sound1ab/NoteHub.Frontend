import { Element, Node } from 'slate'

export function isLink(node: Node) {
  return Element.isElement(node) && node.type === 'link'
}
