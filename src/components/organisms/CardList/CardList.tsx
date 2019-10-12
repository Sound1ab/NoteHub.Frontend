import React from 'react'
import { useStore } from '../../../hooks'
import { useListFiles } from '../../../hooks/file/useListFiles'
import { activeFile } from '../../../store'
import { styled } from '../../../theme'
import { File } from '../../apollo/generated_components_typings'
import { Card } from '../../molecules'
import { Spinner } from '../../atoms'

const Style = styled.div`
  grid-area: filelist;
  position: relative;
  flex: 0 0 auto;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
`

export function CardList() {
  const [state, dispatch] = useStore()
  const { files, loading } = useListFiles(
    state.user.username,
    state.repo.activeRepo.name
  )

  function handleCardClick(file: File) {
    if (dispatch) dispatch(activeFile(file))
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
              onClick={handleCardClick.bind(null, file)}
              title={file.filename}
              isSelected={
                !!state.repo.activeFile &&
                state.repo.activeFile.filename === file.filename
              }
            />
          )
        })}
    </Style>
  )
}
