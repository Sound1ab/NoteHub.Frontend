export function extractFilename(path: string) {
  const [filename] = path.split('/').reverse()
  return filename
}
