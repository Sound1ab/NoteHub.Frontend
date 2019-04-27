import React, { Dispatch, ReducerAction } from 'react'
import { COLOR } from '../../../enums'
import { INote, INotepad } from '../../../interfaces'
import { IState, setActiveNote, TNotepadActions } from '../../../store'
import { styled } from '../../../theme'
import { Container, Heading, Icon } from '../../atoms'
import { Card } from '../../molecules'

const Style = styled.div`
  position: relative;
  flex: 0 0 ${({ theme }) => theme.spacing.xxxl};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.secondary};

  .sticky {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .header {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.s};
    background-color: transparent;
  }

  .header-options {
    cursor: pointer;
  }
`

interface ICardlist {
  activeNotepad: INotepad | null
  activeNote: INote | null
  dispatch: Dispatch<ReducerAction<React.Reducer<IState, TNotepadActions>>>
}

export function CardList({ activeNote, activeNotepad, dispatch }: ICardlist) {
  function handleCardClick(note: INote | null) {
    if (dispatch) dispatch(setActiveNote(note))
  }

  return (
    <Style>
      <Container className="sticky">
        <div className="header">
          <Heading type="h2" marginBottom>
            {(activeNotepad && activeNotepad.title) || ''}
          </Heading>
          <div className="header-options">
            <Icon
              color={COLOR.MEDIUM}
              icon="sync"
              prefix="fa"
              marginRight
              size="sm"
            />
            <Icon
              color={COLOR.MEDIUM}
              icon="trash"
              prefix="fa"
              marginRight
              size="sm"
            />
          </div>
        </div>
        {activeNotepad &&
          activeNotepad.notes.map(note => (
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
