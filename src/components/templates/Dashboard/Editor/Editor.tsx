import React, { useRef } from 'react'
import styled from 'styled-components'

import { CONTAINER_ID } from '../../../../enums'
import { useReadFile } from '../../../../hooks'
import { ContextMenu } from './ContextMenu/ContextMenu'
import { MarkdownEditor, MarkdownEditorSkeleton } from './MarkdownEditor'

export function Editor() {
  const { loading } = useReadFile()
  const target = useRef(null)

  return (
    <Wrapper id={CONTAINER_ID.EDITOR}>
      {loading ? (
        <MarkdownEditorSkeleton />
      ) : (
        <>
          <ContextMenu targetRef={target} />
          <MarkdownEditor targetRef={target} />
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 0 0 100%; // Needed for scroll snap
  position: relative;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-area: editor;
  }
`
