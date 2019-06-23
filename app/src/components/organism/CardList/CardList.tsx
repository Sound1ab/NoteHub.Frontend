import React from 'react'
import { Code } from 'react-content-loader'
import { useStore } from '../../../hooks'
import { useListFiles } from '../../../hooks/file/useListFiles'
import { activeFile } from '../../../store'
import { styled } from '../../../theme'
import { File } from '../../apollo/generated_components_typings'
import { Container } from '../../atoms'
import { Card, CardHeader } from '../../molecules'

const Style = styled.div`
  position: relative;
  flex: 0 0 auto;
  //width: ${({ theme }) => theme.spacing.xxxl}
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  .CardList-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .CardList-card-wrapper {
    border-bottom: 1px solid ${({ theme }) => theme.colors.text.secondary};
  }
  
  .CardList-loader {
    margin-left: ${({ theme }) => theme.spacing.s};
    margin-top: ${({ theme }) => theme.spacing.s};
  }
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
      <CardHeader title={state.repo.activeRepo.name} />
      <Container className="CardList-wrapper">
        {loading ? (
          <>
            <Code className="CardList-loader" />
            <Code className="CardList-loader" />
          </>
        ) : (
          files
            .sort((fileA, fileB) => {
              return fileA.filename.localeCompare(fileB.filename)
            })
            .map(file => {
              return (
                <span
                  key={`${file.sha}-${file.filename}`}
                  className="CardList-card-wrapper"
                  onClick={handleCardClick.bind(null, file)}
                >
                  <Card
                    key={file.sha}
                    id={file.sha}
                    title={file.filename}
                    excerpt={file.excerpt || ''}
                    githubLink={file._links.html}
                    createdAt={''}
                    isSelected={
                      !!state.repo.activeFile &&
                      state.repo.activeFile.filename === file.filename
                    }
                  />
                </span>
              )
            })
        )}
      </Container>
    </Style>
  )
}
