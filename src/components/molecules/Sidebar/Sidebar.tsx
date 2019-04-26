import React from 'react'
import { useStore} from '../../../hooks/useStore'
import { INotepad } from '../../../interfaces'
import { setActiveNote, setActiveNotepad } from '../../../store/actions/notepadAction'
import { styled } from '../../../theme'
import { Container, Heading, Icon } from '../../atoms'

const Style = styled.div`
  position: relative;
  flex: 0 0 ${({theme}) => theme.spacing.xl};
  height: 100%;
  background-color: ${({theme}) => theme.colors.brand};
  
  h5 {
    color: ${({theme}) => theme.colors.text.tertiary};
  }
  
  h6 {
    color: ${({theme}) => theme.colors.text.secondary};
    cursor: pointer;
    
    &:hover {
      color: ${({theme}) => theme.colors.text.tertiary};
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
    margin-bottom: ${({theme}) => theme.spacing.xs};
  }
  
  .sidebar-active-heading {
    color: ${({theme}) => theme.colors.text.tertiary}
  }
`

export function Sidebar() {
  const [state, dispatch] = useStore()

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
            <Icon
              icon="github"
              prefix="fab"
              marginRight
            />
            <Heading type="h5" textTransform="uppercase">Notebooks</Heading>
          </div>
          {state.allNotepads.map((notepad: INotepad) => (
            <span  onClick={handleHeadingClick.bind(null, notepad)}>
              <Heading className={state.activeNotepad && notepad.id === state.activeNotepad.id ? 'sidebar-active-heading' : ''} type="h6" marginBottom>{notepad.title}</Heading>
            </span>
          ))}
        </nav>
      </Container>
    </Style>
  )
}
