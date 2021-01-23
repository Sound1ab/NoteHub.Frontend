import { removeLastSlug } from '../../utils/removeLastSlug'
import { fs } from './index'
import { exists } from './utils/exists'
import { makeDir } from './utils/makeDir'

export interface IWriteFile {
  filepath: string
  content: string
}

export async function writeFile({ filepath, content }: IWriteFile) {
  const directoryPath = removeLastSlug(filepath)

  if (directoryPath.length > 0) {
    // Filtering to remove empty array index caused by leading slash
    await createDirectoriesInPath({ path: directoryPath.filter((i) => i) })
  }

  return fs.promises.writeFile(filepath, content, {
    encoding: 'utf8',
    mode: 0o777,
  })
}

interface ICreateDirectoriesInPath {
  path: string[]
}

async function createDirectoriesInPath({ path }: ICreateDirectoriesInPath) {
  const previousSlugs = []

  while (path.length > 0) {
    const slug = path.shift()

    if (!slug) {
      throw new Error('slug is undefined')
    }

    previousSlugs.push(slug)

    const directoryPath = `/${previousSlugs.join('/')}`

    // Leading slash removed when removing last slug
    const doesDirectoryExist = await exists({ path: directoryPath })

    if (!doesDirectoryExist) {
      await makeDir({ filepath: directoryPath })
    }
  }
}
