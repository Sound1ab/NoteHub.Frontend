import { Retext_Settings } from '../../components/apollo/generated_components_typings'
import { Retext } from '../retext/Retext'

const retext = new Retext()

console.log('retext', retext)

export async function processData(
  markdown: string,
  retextSettings: Retext_Settings[]
) {
  const parser = await retext.createParser(retextSettings)

  return retext.processMarkdownTree(markdown, parser)
}
