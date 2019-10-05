import React from 'react'
import { styled } from '../../../theme'
import { Container, Dropzone } from '../../atoms'
import { Editor as MonacoEditor } from '../../molecules'
import { Sidebar, Toolbar } from '../../organism'

const Style = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .Editor-page {
    display: grid;
    grid-template-columns:
      minmax(0, ${({ theme }) => theme.spacing.xxxl})
      1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'sidebar toolbar'
      'sidebar editor';
    height: 100%;
  }
`

export function Editor() {
  return (
    <Style>
      <Container className="Editor-page">
        <Sidebar />
        <Dropzone>
          <Toolbar />
          <MonacoEditor />
        </Dropzone>
      </Container>
    </Style>
  )
}
