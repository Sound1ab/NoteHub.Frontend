import { isFile } from './isFile'

export function getGithubImagePath(image: string, path?: string | null) {
  if (!path || !isFile(path)) {
    throw new Error('No file selected')
  }

  const splitPath = path.split('/')

  splitPath.pop()

  const imagePath = `images/${image}`

  if (splitPath.length === 0) {
    return imagePath
  }

  return `${splitPath.join('/')}/${imagePath}`
}
