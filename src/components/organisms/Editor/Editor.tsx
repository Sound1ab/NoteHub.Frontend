import React from 'react'

import { CONTAINER_ID } from '../../../enums'
import { useReadFile, useReadIsEdit } from '../../../hooks'
import { styled } from '../../../theme'
import { MarkdownPreview } from '../../atoms'
import { MarkdownEditor, MarkdownEditorSkeleton } from '../../molecules'

const Style = styled.div`
  flex: 0 0 100%;
  position: relative;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-area: editor;
  }
`

export function Editor() {
  const { isEdit } = useReadIsEdit()
  const { loading } = useReadFile()

  return (
    <Style id={CONTAINER_ID.EDITOR}>
      {loading ? (
        <MarkdownEditorSkeleton />
      ) : isEdit ? (
        <MarkdownEditor />
      ) : (
        <MarkdownPreview />
      )}
    </Style>
  )
}
