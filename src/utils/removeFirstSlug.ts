export function removeFirstSlug(path: string) {
  return path.split('/').slice(1).join('/')
}
