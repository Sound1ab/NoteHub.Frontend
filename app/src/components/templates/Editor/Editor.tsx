import React from 'react'
import { styled } from '../../../theme'
import { Ace, Container } from '../../atoms'
import { Dropzone } from '../../atoms/Dropzone/Dropzone'
import { CardList, Sidebar } from '../../organism'

const Style = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .Editor-page {
    display: grid;
    grid-template-columns:
      minmax(0, ${({ theme }) => theme.spacing.xxl}) minmax(
        0,
        ${({ theme }) => theme.spacing.xxxl}
      )
      1fr;
    grid-template-rows: auto;
    grid-template-areas: 'sidebar cardlist editor';
    height: 100%;
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
  return (
    <Style>
      <Container className="Editor-page">
        <Sidebar />
        <CardList />
        <main className="Editor-main">
          <Dropzone>
            <Ace />
          </Dropzone>
        </main>
      </Container>
    </Style>
  )
}
