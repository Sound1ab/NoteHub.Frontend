import React from 'react'
import { Code } from 'react-content-loader'
import { useStore } from '../../../hooks'
import { useListFiles } from '../../../hooks/file/useListFiles'
import { activeNote } from '../../../store'
import { styled } from '../../../theme'
import { Container } from '../../atoms'
import { Card, CardHeader } from '../../molecules'

const Style = styled.div`
  position: relative;
  flex: 0 0 auto;
  width: ${({ theme }) => theme.spacing.xxxl}
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
    state.notebook.activeNotebook
  )

  function handleCardClick(note: string | null) {
    if (dispatch) dispatch(activeNote(note))
  }

  return (
    <Style>
      <CardHeader title={state.notebook.activeNotebook} />
      <Container className="CardList-wrapper">
        {loading ? (
          <>
            <Code className="CardList-loader" />
            <Code className="CardList-loader" />
          </>
        ) : (
          files
            .sort((noteA, noteB) => {
              return noteA.filename.localeCompare(noteB.filename)
            })
            .map(note => {
              return (
                <span
                  key={note.sha}
                  className="CardList-card-wrapper"
                  onClick={handleCardClick.bind(null, note.filename)}
                >
                  <Card
                    key={note.sha}
                    id={note.sha}
                    title={note.filename}
                    excerpt={note.excerpt || ''}
                    githubLink={note._links.html}
                    createdAt={''}
                    isSelected={
                      !!state.notebook.activeNote &&
                      state.notebook.activeNote === note.filename
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
