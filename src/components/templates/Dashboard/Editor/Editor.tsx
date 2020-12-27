import React, { useRef } from 'react'
import styled from 'styled-components'

import { CONTAINER_ID } from '../../../../enums'
import { useCodeMirror } from '../../../../hooks/context/useCodeMirror'
import { useReadFile } from '../../../../hooks/file/useReadFile'
import { ContextMenu } from './ContextMenu/ContextMenu'
import { MarkdownEditor } from './MarkdownEditor/MarkdownEditor'
import { MarkdownEditorSkeleton } from './MarkdownEditor/MarkdownEditorSkeleton'
import { MarkdownRenderer } from './MarkdownEditor/MarkdownRenderer/MarkdownRenderer'

export function Editor() {
  const { loading } = useReadFile()
  const target = useRef(null)
  const { isPreviewActive, isSideBySideActive } = useCodeMirror()

  return (
    <Wrapper id={CONTAINER_ID.EDITOR}>
      {loading ? (
        <MarkdownEditorSkeleton />
      ) : (
        <>
          {!isPreviewActive && <ContextMenu targetRef={target} />}
          {!isPreviewActive && <MarkdownEditor targetRef={target} />}
          {(isPreviewActive || isSideBySideActive) && <MarkdownRenderer />}
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
  justify-content: center;
  display: flex;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-area: editor;
  }
`
