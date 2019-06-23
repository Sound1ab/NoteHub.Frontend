import React from 'react'
import { BulletList } from 'react-content-loader'
import { COLOR } from '../../../enums'
import { useStore } from '../../../hooks'
import { useListFiles } from '../../../hooks/file/useListFiles'
import { activeFile } from '../../../store'
import { styled } from '../../../theme'
import { Heading, Icon } from '../../atoms'

const Style = styled.div`
  line-height: 0;
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
  margin-left: ${({ theme }) => theme.spacing.s};

  .FileList-button {
    background-color: transparent;
  }
`

export function FileList() {
  const [state, dispatch] = useStore()
  const { files, loading } = useListFiles(
    state.user.username,
    state.repo.activeRepo
  )

  function handleCardClick(file: string | null) {
    if (dispatch) dispatch(activeFile(file))
  }

  return (
    <>
      {loading ? (
        <BulletList />
      ) : (
        files
          .sort((fileA, fileB) => {
            return fileA.filename.localeCompare(fileB.filename)
          })
          .map(file => {
            const isActive =
              state.repo.activeFile &&
              file &&
              file.filename === state.repo.activeFile

            return (
              <Style>
                <button className="FileList-button">
                  <Heading
                    key={file.sha}
                    color={isActive ? COLOR.ACTIVE : COLOR.DARK}
                    onClick={handleCardClick.bind(null, file.filename)}
                    type="h6"
                  >
                    {file.filename}
                  </Heading>
                </button>
              </Style>
            )
          })
      )}
    </>
  )
}
