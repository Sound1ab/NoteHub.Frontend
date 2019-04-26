import React  from 'react'
import { useStore} from '../../../hooks/useStore'
import { INote } from '../../../interfaces'
import { setActiveNote } from '../../../store/actions/notepadAction'
import {styled} from '../../../theme'
import { Container } from '../../atoms'
import { Card } from '../../molecules'

const Style = styled.div`
  position: relative;
  flex: 0 0 ${({theme}) => theme.spacing.xxxl};
  height: 100%;
  
  .card-list-sticky {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`

export function CardList() {
  const [state, dispatch] = useStore()

  function handleCardClick(note: INote | null) {
    if (dispatch) dispatch(setActiveNote(note))
  }

  return (
    <Style>
      <Container className="card-list-sticky">
        {state.activeNotepad && state.activeNotepad.notes
          .map(note => (
            <span onClick={handleCardClick.bind(null, note)}>
              <Card
                key={note.id}
                id={note.id}
                title={note.title}
                excerpt={note.excerpt}
                createdAt={note.createdAt}
                isSelected={!!state.activeNote && state.activeNote.id === note.id}
              />
            </span>
          ))}
      </Container>
    </Style>
  )
}
