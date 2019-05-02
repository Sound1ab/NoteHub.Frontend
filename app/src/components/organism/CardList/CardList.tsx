import React from 'react'
import { useListNotes, useReadNotebook, useStore } from '../../../hooks'
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
  const notebook = useReadNotebook(state.notebook.activeNotebook)
  const notes = useListNotes(state.notebook.activeNotebook)

  function handleCardClick(note: string | null) {
    if (dispatch) dispatch(activeNote(note))
  }

  return (
    <Style>
      <CardHeader title={notebook && notebook.title} />
      <Container className="CardList-wrapper">
        {notes &&
          notes
            .sort((noteA, noteB) => {
              if (!noteA || !noteB) return 1
              return (
                new Date(noteB.createdAt.dateLongForm).getTime() -
                new Date(noteA.createdAt.dateLongForm).getTime()
              )
            })
            .map(note => {
              if (!note) return
              return (
                <span
                  className="CardList-card-wrapper"
                  onClick={handleCardClick.bind(null, note.id)}
                >
                  <Card
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    excerpt={note.excerpt}
                    createdAt={
                      note.createdAt &&
                      `${note.createdAt.dayOfMonth} ${note.createdAt.month}`
                    }
                    isSelected={
                      !!state.notebook.activeNote &&
                      state.notebook.activeNote === note.id
                    }
                  />
                </span>
              )
            })}
      </Container>
    </Style>
  )
}
