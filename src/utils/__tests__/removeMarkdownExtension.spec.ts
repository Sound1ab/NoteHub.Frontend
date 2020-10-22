import { removeMarkdownExtension } from '../removeMarkdownExtension'

describe('removeMarkdownExtension', () => {
  it('should remove .md extension', async () => {
    const result = removeMarkdownExtension('test.md')

    expect(result).toEqual('test')
  })

  it('should do nothing if the string does not have a .md extension', async () => {
    const result = removeMarkdownExtension('test')

    expect(result).toEqual('test')
  })
})
