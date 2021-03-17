import { Element, Node } from 'slate'

/**
 * True if the node is a list container
 */
export const isList = (node: Node): boolean =>
  Element.isElement(node) && node.type === 'list'
