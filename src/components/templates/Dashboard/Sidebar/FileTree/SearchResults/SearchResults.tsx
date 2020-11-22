import Fuse from 'fuse.js'
import React from 'react'

import { useReadFiles, useReadSearch } from '../../../../../../hooks'
import { extractFilename } from '../../../../../../utils'
import { Node_Type } from '../../../../../apollo'
import { File } from '../Tree/File/File'

export function SearchResults() {
  const search = useReadSearch()
  const { files } = useReadFiles()

  if (!files) {
    return null
  }

  const fuse = new Fuse(
    files
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
        return (
          <File
            key={path}
            node={{
              id: path,
              name: slug,
              type,
              path,
              isOptimistic: false,
            }}
            level={-1}
          />
        )
      })}
    </>
  )
}
