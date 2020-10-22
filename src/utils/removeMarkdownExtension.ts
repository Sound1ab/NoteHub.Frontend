export function removeMarkdownExtension(file: string) {
  return file.replace(/.md/gi, '')
}
