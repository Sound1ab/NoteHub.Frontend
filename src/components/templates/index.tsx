import React from 'react'
import { styled } from '../../theme'
import {Container} from '../atoms'
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
  min-height: 100vh;

  .layout-page {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
  }

  .layout-sidebar {
    flex: 0 0 300px;
  }

  .layout-main {
    display: flex;
    flex-direction: column;
    flex: 2;
    position: relative;
    padding: ${({ theme }) => theme.spacing.s};
    min-width: 0;
  }
`

interface IIndex {
  children?: any
}

export function IIndex({children}: IIndex) {
  const date = new Date()
  console.log(date.toISOString())
  return (
    <Style>
      <Container className="layout-page">
        <Sidebar />
        <CardList />
        <main className="layout-main">{children}</main>
      </Container>
    </Style>
  )
}
