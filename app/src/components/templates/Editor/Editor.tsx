import React from 'react'
import { useStore } from '../../../hooks/useStore'
import { styled } from '../../../theme'
import { Ace, Container } from '../../atoms'
import { Sidebar } from '../../molecules'
import { CardList } from '../../organism'

const Style = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .page {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
  }

  .main {
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    min-width: 0;
    height: 100%;
  }
`

export function Editor() {
  const [state, dispatch] = useStore()

  return (
    <Style>
      <Container className="page">
        <Sidebar
          allNotepads={state.allNotepads}
          activeNotepad={state.activeNotepad}
          dispatch={dispatch}
        />
        <CardList
          activeNotepad={state.activeNotepad}
          activeNote={state.activeNote}
          dispatch={dispatch}
        />
        <main className="main">
          <Ace
            activeNotepad={state.activeNotepad}
            activeNote={state.activeNote}
            dispatch={dispatch}
          />
        </main>
      </Container>
    </Style>
  )
}
