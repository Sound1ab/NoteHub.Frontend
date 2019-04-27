import React, { Dispatch, ReducerAction } from 'react'
import { Profile } from '..'
import { COLOR } from '../../../enums'
import { INotepad } from '../../../interfaces'
import { IState, setActiveNote, setActiveNotepad, TNotepadActions } from '../../../store'
import { styled } from '../../../theme'
import { Container, Heading, Icon } from '../../atoms'

const Style = styled.div`
  position: relative;
  flex: 0 0 ${({ theme }) => theme.spacing.xxl};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  
  .new-notebook-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.s};
  }
  
  .title-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  .heading {
    color: ${({ theme }) => theme.colors.text.secondary};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.text.tertiary};
    }
  }

  .active-heading {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  .sticky {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: ${({ theme }) => theme.spacing.s};
  }

  .nav > a {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`

interface ISidebar {
  allNotepads: INotepad[]
  activeNotepad: INotepad | null
  dispatch: Dispatch<ReducerAction<React.Reducer<IState, TNotepadActions>>>
}

export function Sidebar({ allNotepads, activeNotepad, dispatch }: ISidebar) {
  function handleHeadingClick(notepad: INotepad) {
    if (dispatch) {
      dispatch(setActiveNotepad(notepad))
      dispatch(setActiveNote(null))
    }
  }

  return (
    <Style>
      <Container className="sticky">
        <Profile />
        <div className="new-notebook-wrapper">
          <Icon size="lg" color={COLOR.ACCENT} icon="plus-circle" prefix="fa" marginRight />
          <Heading
            color={COLOR.LIGHT}
            className="category-heading"
            type="h3"
          >
            New Notebook
          </Heading>
        </div>
        <div className="title-wrapper">
          <Icon icon="book" prefix="fa" marginRight />
          <Heading
            color={COLOR.LIGHT}
            className="category-heading"
            type="h5"
            textTransform="uppercase"
          >
            Notebooks
          </Heading>
        </div>
        <nav className="nav">
          {allNotepads.map((notepad: INotepad) => (
            <Heading
              onClick={handleHeadingClick.bind(null, notepad)}
              className={
                activeNotepad && notepad.id === activeNotepad.id
                  ? 'heading active-heading'
                  : 'heading'
              }
              type="h4"
              marginBottom
            >
              {notepad.title}
            </Heading>
          ))}
        </nav>
      </Container>
    </Style>
  )
}
