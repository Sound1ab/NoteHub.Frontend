import { useReactiveVar } from '@apollo/client'
import Fuse from 'fuse.js'
import React from 'react'

import { useReadNodes } from '../../../../../../hooks'
import { createNode, extractFilename } from '../../../../../../utils'
import { Node_Type } from '../../../../../apollo'
import { searchVar } from '../../../../../providers/ApolloProvider/cache'
import { File } from '../Tree/File/File'

export function SearchResults() {
  const search = useReactiveVar(searchVar)
  const { gitNodes } = useReadNodes()

  if (!gitNodes) {
    return null
  }

  const fuse = new Fuse(
    gitNodes
      .filter(({ type }) => type === Node_Type.File)
      .map(({ type, path }) => {
        const slug = extractFilename(path)

        return {
          slug,
          path,
          type,
        }
      }),
    {
      keys: ['slug'],
      threshold: 0.5,
    }
  )

  const results = fuse.search(search)

  return (
    <>
      {results.map(({ item: { path, type, slug } }) => {
        const node = createNode(type, slug, path, new Set())

        return <File key={path} node={node} level={-1} />
      })}
    </>
  )
}
