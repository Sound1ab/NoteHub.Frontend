import React from 'react'

import { CONTAINER_ID } from '../../../enums'
import {
  useListFiles,
  useReadCurrentFileName,
  useReadRepo,
} from '../../../hooks'
import { styled } from '../../../theme'
import { scrollIntoView } from '../../../utils'
import { List, ListItem, ListItemSkeleton } from '..'

const Style = styled.div`
  position: relative;
`

export function Files() {
  const { currentFileName, client } = useReadCurrentFileName()
  const { files, loading: filesLoading } = useListFiles()
  const { loading: repoLoading } = useReadRepo()

  function handleCardClick(filename: string) {
    client.writeData({ data: { currentFileName: filename } })
    scrollIntoView(CONTAINER_ID.EDITOR)
  }

  if (filesLoading || repoLoading) {
    return <ListItemSkeleton />
  }

  return (
    <Style>
      <List items={files.map(file => ({ ...file, name: file.filename }))}>
        {file => (
          <ListItem
            key={`${file.sha}-${file.filename}`}
            onClick={() => handleCardClick(file.filename)}
            heading={file.filename.replace(/.md/, '')}
            isActive={currentFileName === file.filename}
            isDisabled={file.sha === 'optimistic'}
          />
        )}
      </List>
    </Style>
  )
}
