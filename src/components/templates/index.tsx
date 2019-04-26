import React from 'react'
import { styled } from '../../theme'
import { Container, TextArea } from '../atoms'
import {Sidebar} from '../molecules'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faEnvelope,
  faUser,
  faComment,
  faPenSquare,
  faMoon,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faSoundcloud } from '@fortawesome/free-brands-svg-icons'
import { CardList } from '../organism'
import { useStore } from '../../hooks/useStore'

library.add(
  faGithub as any,
  faSoundcloud as any,
  faEnvelope,
  faUser,
  faMoon,
  faComment,
  faPenSquare
)

const Style = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  
  .layout-page {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
  }

  .layout-main {
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    min-width: 0;
    height: 100%;
    overflow-y: scroll;
  }
`

export function IIndex() {
  const [state] = useStore()
  
  return (
    <Style>
      <Container className="layout-page">
        <Sidebar />
        <CardList />
        <main className="layout-main">
          <TextArea content={state.activeNote ? state.activeNote.content : null} />
        </main>
      </Container>
    </Style>
  )
}
