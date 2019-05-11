import React from 'react'
import { useStore } from '../../../hooks'
import { styled } from '../../../theme'
import { Ace, Container } from '../../atoms'
import { CardList, Sidebar } from '../../organism'

const Style = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .Editor-page {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
  }

  .Editor-main {
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    min-width: 0;
    height: 100%;
  }
`

export function Editor() {
  const [state] = useStore()

  return (
    <Style>
      <Container className="Editor-page">
        <Sidebar />
        <CardList />
        <main className="Editor-main">
          <Ace />
        </main>
      </Container>
    </Style>
  )
}
