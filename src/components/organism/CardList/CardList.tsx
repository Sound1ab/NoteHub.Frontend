import React, { useContext, useState } from 'react'
import { useStore} from '../../../hooks/useStore'
import { INotepad } from '../../../interfaces'
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
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
  const [state] = useStore()
  const notes = state.allNotepads.length > 0 ? state.allNotepads[0].notes : []

  return (
    <Style>
      <Container className="card-list-sticky">
        {notes && notes
          .map(note => (
            <Card
              key={note.id}
              id={note.id}
              title={note.title}
              excerpt={note.excerpt}
              createdAt={note.createdAt}
              isSelected={selectedCardId === note.id}
              handleSetSelectedCardId={setSelectedCardId}
            />
          ))}
      </Container>
    </Style>
  )
}
