import React from 'react'

import {
  useListFiles,
  useReadCurrentFileName,
  useReadIsNewFileOpen,
} from '../../../hooks'
import { styled } from '../../../theme'
import { Card, CardSkeleton, FileInput } from '../../molecules'

const Style = styled.div`
  grid-area: cardlist;
  position: relative;
  flex: 0 0 auto;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.primary};
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
  const { isNewFileOpen } = useReadIsNewFileOpen()

  function handleCardClick(filename: string) {
    client.writeData({ data: { currentFileName: filename } })
  }

  return (
    <Style>
      {isNewFileOpen && <Card renderInput={<FileInput />} />}
      {loading ? (
        <CardSkeleton />
      ) : (
        files
          .sort((fileA, fileB) => {
            return fileA.filename.localeCompare(fileB.filename)
          })
          .map(file => {
            return (
              <Card
                key={`${file.sha}-${file.filename}`}
                onClick={() => handleCardClick(file.filename)}
                heading={file.filename.replace(/.md/, '')}
                isActive={currentFileName === file.filename}
                isDisabled={file.sha === 'optimistic'}
              />
            )
          })
      )}
    </Style>
  )
}
