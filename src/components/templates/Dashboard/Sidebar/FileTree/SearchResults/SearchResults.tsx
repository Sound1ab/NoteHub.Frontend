import Fuse from 'fuse.js'
import React from 'react'

import { useReadFiles } from '../../../../../../hooks/file/useReadFiles'
import { useReadSearch } from '../../../../../../hooks/localState/useReadSearch'
import { extractFilename } from '../../../../../../utils/extractFilename'
import { Node_Type } from '../../../../../apollo/generated_components_typings'
import { File } from '../Tree/File/File'

export function SearchResults() {
  const search = useReadSearch()
  const { files } = useReadFiles()

  if (!files) {
    return null
  }

  const fuse = new Fuse(
    files
      .filter(({ type }: { type: Node_Type }) => type === Node_Type.File)
      .map(({ type, path }: { type: Node_Type; path: string }) => {
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

  const results = fuse.search<{ type: Node_Type; path: string; slug: string }>(
    search
  )

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
