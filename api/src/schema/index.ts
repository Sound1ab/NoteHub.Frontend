import { fileLoader, mergeTypes } from 'merge-graphql-schemas'
import path from 'path'

const isDev = process.env.NODE_ENV === 'development'

export function generateTypedefs() {
  if (isDev) {
    const typesArray = fileLoader(path.join(__dirname))
    return mergeTypes(typesArray, { all: true })
  } else {
    const file = require('./file.graphql')
    const image = require('./image.graphql')
    const repo = require('./repo.graphql')
    const user = require('./user.graphql')
    return mergeTypes([file, image, repo, user], { all: true })
  }
}
