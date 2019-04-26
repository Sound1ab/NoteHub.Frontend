import React, { Dispatch, ReducerAction } from 'react'
import { useStore} from '../../../hooks/useStore'
import { INote, INotepad } from '../../../interfaces'
import { setActiveNote, TNotepadActions } from '../../../store/actions/notepadAction'
import {styled} from '../../../theme'
import { Container } from '../../atoms'
import { Card } from '../../molecules'
import { IState } from '../../../store'

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

interface ICardlist {
  activeNotepad: INotepad | null
  activeNote: INote | null
  dispatch: Dispatch<ReducerAction<React.Reducer<IState, TNotepadActions>>>
}

export function CardList({activeNote, activeNotepad, dispatch}: ICardlist) {
  function handleCardClick(note: INote | null) {
    if (dispatch) dispatch(setActiveNote(note))
  }

  return (
    <Style>
      <Container className="card-list-sticky">
        {activeNotepad && activeNotepad.notes
          .map(note => (
            <span onClick={handleCardClick.bind(null, note)}>
              <Card
                key={note.id}
                id={note.id}
                title={note.title}
                excerpt={note.excerpt}
                createdAt={note.createdAt}
                isSelected={!!activeNote && activeNote.id === note.id}
              />
            </span>
          ))}
      </Container>
    </Style>
  )
}
