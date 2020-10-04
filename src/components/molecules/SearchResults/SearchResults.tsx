import Fuse from 'fuse.js'
import React from 'react'

import { useReadNodes, useReadSearch } from '../../../hooks'
import { createNode, extractFilename } from '../../../utils'
import { Node_Type } from '../../apollo/generated_components_typings'
import { File } from '../../atoms/NodeItem/File'

export function SearchResults() {
  const { gitNodes } = useReadNodes()
  const { search } = useReadSearch()

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

        return <File key={path} node={node} onToggle={() => null} level={-1} />
      })}
    </>
  )
}
