import React from 'react'

import {
  useListFiles,
  useReadCurrentFileName,
  useReadIsNewFileOpen,
} from '../../../hooks'
import { styled } from '../../../theme'
import { Card } from '../../molecules'
import { FileInput } from '../../molecules/FileInput/FileInput'

const Style = styled.div`
  grid-area: filelist;
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
  const { files } = useListFiles()
  const { isNewFileOpen } = useReadIsNewFileOpen()

  function handleCardClick(filename: string) {
    client.writeData({ data: { currentFileName: filename } })
  }

  return (
    <Style>
      {isNewFileOpen && <Card renderInput={<FileInput />} />}
      {files
        .sort((fileA, fileB) => {
          return fileA.filename.localeCompare(fileB.filename)
        })
        .map(file => {
          return (
            <Card
              key={`${file.sha}-${file.filename}`}
              onClick={handleCardClick.bind(null, file.filename)}
              heading={file.filename.replace(/.md/, '')}
              isActive={currentFileName === file.filename}
            />
          )
        })}
    </Style>
  )
}
