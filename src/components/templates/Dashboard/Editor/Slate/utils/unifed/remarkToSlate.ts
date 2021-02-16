import gfm from 'remark-gfm'
import parse from 'remark-parse'
import { remarkToSlate as _remarkToSlate } from 'remark-slate-transformer'
import unified from 'unified'

import { mdastAppendTextToEmptyListItem } from '../mdast/mdastAppendTextToEmptyListItem'
import { mdastFlattenBlockQuote } from '../mdast/mdastFlattenBlockQuote'
import { flattenListItemParagraphs } from '../mdast/mdastFlattenListItem'
import { mdastHr } from '../mdast/mdastHr'
import { mdastTable } from '../mdast/mdastTable'
import { mdastTableCell } from '../mdast/mdastTableCell'
import { mdastTableHeader } from '../mdast/mdastTableHeader'

export function remarkToSlate(markdown: string) {
  const processor = unified()
    .use(parse)
    .use(gfm)
    .use(mdastHr)
    .use(flattenListItemParagraphs)
    .use(mdastFlattenBlockQuote)
    .use(mdastAppendTextToEmptyListItem)
    .use(mdastTableHeader)
    .use(mdastTableCell)
    .use(mdastTable)
    .use(_remarkToSlate)

  const vFile = processor.processSync(markdown)

  // eslint-disable-next-line
  return (vFile as any).result
}
