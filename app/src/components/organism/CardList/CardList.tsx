import React from 'react'
import { useStore } from '../../../hooks'
import { useListFiles } from '../../../hooks/file/useListFiles'
import { useReadRepo } from '../../../hooks/Repo/useReadRepo'
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
`

export function CardList() {
  const [state, dispatch] = useStore()
  const notebook = useReadRepo(
    state.user.username,
    state.notebook.activeNotebook
  )
  const notes = useListFiles(state.user.username, state.notebook.activeNotebook)

  function handleCardClick(note: string | null) {
    if (dispatch) dispatch(activeNote(note))
  }

  return (
    <Style>
      <CardHeader title={notebook && notebook.name} />
      <Container className="CardList-wrapper">
        {notes &&
          notes
            .sort((noteA, noteB) => {
              if (!noteA || !noteB) return 0
              return noteA.name < noteB.name ? -1 : 1
            })
            .map(note => {
              if (!note) return
              return (
                <span
                  className="CardList-card-wrapper"
                  onClick={handleCardClick.bind(null, note.name)}
                >
                  <Card
                    key={note.id}
                    id={note.id}
                    title={note.name}
                    excerpt={''}
                    createdAt={''}
                    isSelected={
                      !!state.notebook.activeNote &&
                      state.notebook.activeNote === note.name
                    }
                  />
                </span>
              )
            })}
      </Container>
    </Style>
  )
}
