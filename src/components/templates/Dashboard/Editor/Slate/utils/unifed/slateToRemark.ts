import gfm from 'remark-gfm'
// @ts-ignore
import { slateToRemark as _slateToRemark } from 'remark-slate-transformer'
import stringify from 'remark-stringify'
import { Descendant } from 'slate'
import unified from 'unified'

export function slateToRemark(slateJson: Descendant[]) {
  const processor = unified().use(_slateToRemark).use(gfm).use(stringify)

  const ast = processor.runSync({
    type: 'root',
    children: slateJson,
  })

  return processor.stringify(ast)
}
