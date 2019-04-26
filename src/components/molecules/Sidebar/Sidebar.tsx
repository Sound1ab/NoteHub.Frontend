import React, {useContext} from 'react'
import { useStore} from '../../../hooks/useStore'
import { INotepad } from '../../../interfaces'
import { styled } from '../../../theme'
import { Heading, Icon, Container } from '../../atoms'

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
`

export function Sidebar() {
  const [state] = useStore()

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
          {state.allNotepads.length > 0 && state.allNotepads.map((notepad: INotepad) => (
            <Heading type="h6" marginBottom>{notepad.title}</Heading>
          ))}
        </nav>
      </Container>
    </Style>
  )
}
