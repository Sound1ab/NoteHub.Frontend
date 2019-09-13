import React from 'react'
import ContentLoader from 'react-content-loader'
import { COLOR } from '../../../enums'
import { useStore } from '../../../hooks'
import { useListFiles } from '../../../hooks/file/useListFiles'
import { activeFile } from '../../../store'
import { styled } from '../../../theme'
import { File } from '../../apollo/generated_components_typings'
import { Heading } from '../../atoms'

const Style = styled.div`
  line-height: 0;
  margin-left: ${({ theme }) => theme.spacing.s};
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .FileList-button {
    background-color: transparent;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`

export function FileList() {
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
      {loading ? (
        <ContentLoader height={50}>
          <circle cx="10" cy="20" r="8" />
          <rect x="25" y="15" rx="5" ry="5" width="220" height="10" />
        </ContentLoader>
      ) : (
        files
          .sort((fileA, fileB) => {
            return fileA.filename.localeCompare(fileB.filename)
          })
          .map(file => {
            const isActive =
              state.repo.activeFile &&
              file &&
              file.filename === state.repo.activeFile.filename

            return (
              <button className="FileList-button">
                <Heading
                  key={file.sha}
                  color={isActive ? COLOR.ACTIVE : COLOR.INHERIT}
                  onClick={handleCardClick.bind(null, file)}
                  type="h6"
                >
                  {file.filename}
                </Heading>
              </button>
            )
          })
      )}
    </Style>
  )
}
