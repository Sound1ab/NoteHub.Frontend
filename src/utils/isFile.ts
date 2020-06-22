export function isFile(path?: string | null) {
  return path?.endsWith('.md')
}
