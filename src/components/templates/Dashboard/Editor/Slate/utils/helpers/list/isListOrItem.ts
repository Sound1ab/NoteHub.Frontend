import { Node } from 'slate'

import { isItem } from './isItem'
import { isList } from './isList'

export const isListOrItem = (node: Node): boolean =>
  isList(node) || isItem(node)
