import { Element, Node } from 'slate'

/**
 * True if the node is a list item
 */
export const isItem = (node: Node): boolean =>
  Element.isElement(node) && 'listItem' === node.type
