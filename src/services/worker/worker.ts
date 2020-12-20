import { Retext_Settings } from '../../components/apollo'
import { Retext } from '../retext/Retext'

const retext = new Retext()

export async function processData(
  markdown: string,
  retextSettings: Retext_Settings[]
) {
  const parser = await retext.createParser(retextSettings)

  return retext.processMarkdownTree(markdown, parser)
}
