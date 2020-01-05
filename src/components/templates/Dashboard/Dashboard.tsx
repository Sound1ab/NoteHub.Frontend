import React from 'react'

import { styled } from '../../../theme'
import { CardList, Editor, Sidebar, Toolbar } from '../../organisms'

const Style = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .Dashboard-page {
    display: grid;
    grid-template-columns:
      min-content
      min-content
      3fr;
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
      'toolbar toolbar toolbar'
      'loadingBar loadingBar loadingBar'
      'sidebar filelist editor';
    height: 100%;
    width: 100%;
  }
`

export function Dashboard() {
  return (
    <Style>
      <div className="Dashboard-page">
        <Sidebar />
        <CardList />
        <Toolbar />
        <Editor />
      </div>
    </Style>
  )
}
