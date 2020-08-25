import React from 'react'

import { CONTAINER_ID } from '../../../enums'
import { useReadFile } from '../../../hooks'
import { styled } from '../../../theme'
import { MarkdownEditor, MarkdownEditorSkeleton } from '../../molecules'

const Style = styled.div`
  flex: 0 0 100%; // Needed for scroll snap
  position: relative;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-area: editor;
  }
`

export function Editor() {
  const { loading } = useReadFile()

  return (
    <Style id={CONTAINER_ID.EDITOR}>
      {loading ? <MarkdownEditorSkeleton /> : <MarkdownEditor />}
    </Style>
  )
}
