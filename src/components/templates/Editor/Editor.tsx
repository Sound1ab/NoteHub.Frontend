import React from 'react'
import { styled } from '../../../theme'
import { Dropzone } from '../../atoms'
import { Editor as MonacoEditor } from '../../molecules'
import { CardList, Sidebar, Toolbar } from '../../organisms'

const Style = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .Editor-page {
    display: grid;
    grid-template-columns:
      minmax(0, ${({theme}) => theme.spacing.xl})
      minmax(0, ${({theme}) => theme.spacing.xxl})
      3fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'toolbar toolbar toolbar'
      'sidebar filelist editor';
    height: 100%;
    width: 100%;
  }
`

export function Editor() {
  return (
    <Style>
      <div className="Editor-page">
        <Sidebar />
        <CardList />
        <Dropzone>
          <MonacoEditor>
            <Toolbar />
          </MonacoEditor>
        </Dropzone>
      </div>
    </Style>
  )
}
