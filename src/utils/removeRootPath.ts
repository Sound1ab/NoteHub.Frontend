import { ROOT_PATH } from './createNodes'

export function removeRootPath(path: string[]) {
  const [root, ...rest] = path

  // Test if the root is ROOT_PATH. If it is we need to remove as that
  // construct only applies on the client in order to toggle the root node.
  // Github does not know about the root path and will reject it.
  return root === ROOT_PATH ? rest : [root, ...rest]
}
