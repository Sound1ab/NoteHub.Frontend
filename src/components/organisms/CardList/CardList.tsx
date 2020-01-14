import React from 'react'

import { CONTAINER_ID } from '../../../enums'
import {
  useListFiles,
  useReadCurrentFileName,
  useReadIsNewFileOpen,
  useReadRepo,
} from '../../../hooks'
import { styled } from '../../../theme'
import { scrollIntoView } from '../../../utils'
import { Heading } from '../../atoms'
import { Card, CardSkeleton, FileInput } from '../../molecules'

const Style = styled.div`
  flex: 0 0 100%;
  position: relative;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-area: cardlist;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    resize: horizontal;
    min-width: ${({ theme }) => theme.spacing.xxl};
    max-width: 50vw;
  }

  .Cardlist-header {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding: ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.text.primary};
    overflow: hidden;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    text-transform: uppercase;
  }

  .Cardlist-header-heading {
    font-weight: bold;
  }
`

export function CardList() {
  const { currentFileName, client } = useReadCurrentFileName()
  const { files, loading: filesLoading } = useListFiles()
  const { repo, loading: repoLoading } = useReadRepo()
  const { isNewFileOpen } = useReadIsNewFileOpen()

  function handleCardClick(filename: string) {
    client.writeData({ data: { currentFileName: filename } })
    scrollIntoView(CONTAINER_ID.EDITOR)
  }

  return (
    <Style id={CONTAINER_ID.CARDLIST}>
      {filesLoading || repoLoading ? (
        <CardSkeleton />
      ) : (
        <>
          {repo?.private && (
            <li className="Cardlist-header">
              <Heading className="Cardlist-header-heading" type="h4">
                Private repo
              </Heading>
            </li>
          )}
          {isNewFileOpen && <Card renderInput={<FileInput />} />}
          {files
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
            })}
        </>
      )}
    </Style>
  )
}
