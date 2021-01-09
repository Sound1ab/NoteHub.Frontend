import React, { useEffect } from 'react'
import styled from 'styled-components'

import { CONTAINER_ID } from '../../../../enums'
import { useFs } from '../../../../hooks/fs/useFs'
import { useReadCurrentPath } from '../../../../hooks/localState/useReadCurrentPath'
import { isFile } from '../../../../utils/isFile'
import { MarkdownEditor } from './MarkdownEditor/MarkdownEditor'
import { MarkdownEditorSkeleton } from './MarkdownEditor/MarkdownEditorSkeleton'

export function Editor() {
  const currentPath = useReadCurrentPath()
  const [{ readFile }, { loading }] = useFs()

  useEffect(() => {
    if (!isFile(currentPath)) {
      return
    }

    readFile?.(currentPath)
  }, [currentPath, readFile])

  return (
    <Wrapper id={CONTAINER_ID.EDITOR}>
      {loading ? <MarkdownEditorSkeleton /> : <MarkdownEditor />}
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
