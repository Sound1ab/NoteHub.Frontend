import parseEnglish from 'parse-english'
import parse from 'remark-parse'
import remark2retext from 'remark-retext'
import remarkStringify from 'remark-stringify'
import equality from 'retext-equality'
import indefiniteArticle from 'retext-indefinite-article'
import readability from 'retext-readability'
import repeated from 'retext-repeated-words'
import spell from 'retext-spell'
import retextStringify from 'retext-stringify'
import unified, { Processor } from 'unified'

import { Retext_Settings } from '../../components/apollo'
import { enGbAff } from './enGbAff'
import { enGbDic } from './enGbDic'

export class Retext {
  private frontMatterParser = unified().use(parse).use(remarkStringify)

  public createParser(retextSettings: Retext_Settings[]) {
    const retextParser = unified().use(parse).use(remark2retext, parseEnglish)

    retextSettings.forEach((option) => {
      switch (option) {
        case Retext_Settings.Spell:
          retextParser.use(
            spell,
            (callback: (a: null, b: { aff: string; dic: string }) => void) => {
              callback(null, {
                aff: enGbAff,
                dic: enGbDic,
              })
            }
          )
          break
        case Retext_Settings.Equality:
          retextParser.use(equality)
          break
        case Retext_Settings.IndefiniteArticle:
          retextParser.use(indefiniteArticle)
          break
        case Retext_Settings.RepeatedWords:
          retextParser.use(repeated)
          break
        case Retext_Settings.Readability:
          retextParser.use(readability)
          break
      }
    })

    return retextParser.use(retextStringify)
  }

  public async processMarkdownTree(markdown: string, parser: Processor) {
    const file = await parser.process(markdown)

    return file.messages.map((message) => {
      return {
        ...message,
        actual: message.actual,
        location: {
          ...message.location,
          end: {
            offset: message.location.end.offset,
          },
          start: {
            offset: message.location.start.offset,
          },
        },
      }
    })
  }

  public async processFrontMatter(markdown: string) {
    const file = await this.frontMatterParser.process(markdown)

    if (
      file.data === undefined ||
      typeof file.data !== 'object' ||
      file.data === null ||
      !this.hasRetextProperty(file.data)
    ) {
      return
    }

    const { retext } = file.data

    return retext.filter(this.isString).filter(this.isPlugin)
  }

  private isPlugin(value: string): value is Retext_Settings {
    return Object.values(Retext_Settings).includes(value as Retext_Settings)
  }

  private hasRetextProperty(data: {
    retext?: unknown
  }): data is { retext: unknown[] } {
    return 'retext' in data && Array.isArray(data.retext)
  }

  private isString(value: unknown): value is string {
    return typeof value === 'string'
  }
}
