import React from 'react'

import { useListFiles, useReadCurrentFileName } from '../../../hooks'
import { styled } from '../../../theme'
import { Spinner } from '../../atoms'
import { Card } from '../../molecules'

const Style = styled.div`
  grid-area: filelist;
  position: relative;
  flex: 0 0 auto;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  overflow: auto;
  resize: horizontal;
  min-width: ${({ theme }) => theme.spacing.xxl};
  max-width: 50vw;
`

export function CardList() {
  const { currentFileName, client } = useReadCurrentFileName()
  const { files, loading } = useListFiles()

  function handleCardClick(filename: string) {
    client.writeData({ data: { currentFileName: filename } })
  }

  return (
    <Style>
      {loading && <Spinner />}
      {files
        .sort((fileA, fileB) => {
          return fileA.filename.localeCompare(fileB.filename)
        })
        .map(file => {
          return (
            <Card
              key={`${file.sha}-${file.filename}`}
              onClick={handleCardClick.bind(null, file.filename)}
              heading={file.filename}
              isActive={currentFileName === file.filename}
            />
          )
        })}
    </Style>
  )
}
