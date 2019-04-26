import React, {useContext} from 'react'
import {NoteContext} from '../../../Context'
import { INotepad } from '../../../interfaces'
import { styled } from '../../../theme'
import { Heading, Icon, StickyContainer } from '../../atoms'

const Style = styled.div`
  position: relative;
  flex: 0 0 ${({theme}) => theme.spacing.xl};
  height: 100vh;
  background-color: ${({theme}) => theme.colors.brand};

  .sidebar-sticky {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: ${({ theme }) => theme.spacing.xs};
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
`

export function Sidebar() {
  const notepads = useContext<INotepad[] | null>(NoteContext)

  return (
    <Style>
      <StickyContainer className="sidebar-sticky">
        <nav className="sidebar-nav">
          <div className="sidebar-title">
            <Icon
              icon="github"
              prefix="fab"
              marginRight
            />
            <Heading type="h5" textTransform="uppercase">Notebooks</Heading>
          </div>
          {notepads && notepads.map((notepad: INotepad) => (
            <Heading type="h6" marginBottom>{notepad.title}</Heading>
          ))}
        </nav>
      </StickyContainer>
    </Style>
  )
}
