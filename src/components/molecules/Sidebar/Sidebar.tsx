import React, { Dispatch, ReducerAction } from 'react'
import { INotepad } from '../../../interfaces'
import { IState } from '../../../store'
import {
  setActiveNote,
  setActiveNotepad,
  TNotepadActions,
} from '../../../store'
import { styled } from '../../../theme'
import { Container, Heading, Icon } from '../../atoms'

const Style = styled.div`
  position: relative;
  flex: 0 0 ${({ theme }) => theme.spacing.xl};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.brand};

  .sidebar-category-heading {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  .sidebar-heading {
    color: ${({ theme }) => theme.colors.text.secondary};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.text.tertiary};
    }
  }

  .sidebar-sticky {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: ${({ theme }) => theme.spacing.s};
  }

  .sidebar-nav > a {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  .sidebar-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  .sidebar-active-heading {
    color: ${({ theme }) => theme.colors.text.tertiary};
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
      <Container className="sidebar-sticky">
        <nav className="sidebar-nav">
          <div className="sidebar-title">
            <Icon icon="github" prefix="fab" marginRight />
            <Heading className="sidebar-category-heading" type="h5" textTransform="uppercase">
              Notebooks
            </Heading>
          </div>
          {allNotepads.map((notepad: INotepad) => (
            <span onClick={handleHeadingClick.bind(null, notepad)}>
              <Heading
                className={
                  activeNotepad && notepad.id === activeNotepad.id
                    ? 'sidebar-heading sidebar-active-heading'
                    : 'sidebar-heading'
                }
                type="h4"
                marginBottom
              >
                {notepad.title}
              </Heading>
            </span>
          ))}
        </nav>
      </Container>
    </Style>
  )
}
