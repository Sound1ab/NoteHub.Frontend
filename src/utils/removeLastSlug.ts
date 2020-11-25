export function removeLastSlug(path: string) {
  return path.split('/').slice(0, -1)
}
