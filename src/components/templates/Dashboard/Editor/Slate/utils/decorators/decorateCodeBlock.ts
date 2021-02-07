import Prism, { Token } from 'prismjs'
import { Node, NodeEntry, Range, Text } from 'slate'

export function decorateCodeBlock([node, path]: NodeEntry): Range[] {
  const ranges: Range[] = []

  let text = ''

  const generator = Node.texts(node)

  for (const nodeEntry of generator) {
    nodeEntry.forEach((node) => {
      if (!Text.isText(node)) return

      text += node.text
    })
  }

  const tokens = Prism.tokenize(text, Prism.languages['javascript'])

  let start = 0

  for (const token of tokens) {
    const length = getLength(token)

    const end = start + length

    if (typeof token !== 'string') {
      ranges.push({
        [token.type]: true,
        anchor: { path, offset: start },
        focus: { path, offset: end },
      })
    }

    start = end
  }

  return ranges
}

const getLength = (token: string | Token) => {
  if (typeof token === 'string') {
    return token.length
  } else if (typeof token.content === 'string') {
    return token.content.length
  } else {
    return (token.content as any).reduce(
      (l: number, t: string | Token) => l + getLength(t),
      0
    )
  }
}
