import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { CONTAINER_ID } from '../../../../enums'
import { useFs } from '../../../../hooks/fs/useFs'
import { useActivePath } from '../../../../hooks/recoil/useActivePath'
import { isFile } from '../../../../utils/isFile'
import { Fade } from '../../../animation/Mount/Fade'
import { CodeMirror } from '../CodeMirror/CodeMirror'
import { ContextMenu } from '../CodeMirror/ContextMenu/ContextMenu'
import { DraftManager } from '../DraftManager/DraftManager'
import { MarkdownEditorSkeleton } from './MarkdownEditorSkeleton'

export function Editor() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [fileContent, setFileContent] = useState('')
  const [{ readFile }, { loading }] = useFs()
  const [activePath] = useActivePath()

  useEffect(() => {
    if (!isFile(activePath)) {
      return
    }

    async function loadContentFromFS() {
      setFileContent((await readFile(activePath)) ?? '')
    }

    loadContentFromFS()
  }, [activePath, readFile])

  return (
    <>
      <Fade show={loading}>
        <MarkdownEditorSkeleton />
      </Fade>
      <Fade show={!loading}>
        <Wrapper id={CONTAINER_ID.EDITOR} ref={wrapperRef}>
          <CodeMirror fileContent={fileContent}>
            <ContextMenu targetRef={wrapperRef} />
            <DraftManager />
          </CodeMirror>
        </Wrapper>
      </Fade>
    </>
  )
}

const Wrapper = styled.div`
  flex: 0 0 100%; // Needed for scroll snap
  position: relative;
  height: 100%;
  justify-content: center;
  display: flex;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-area: editor;
  }
`
