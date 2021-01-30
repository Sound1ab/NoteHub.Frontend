import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useFs } from '../../../../hooks/fs/useFs'
import { useActivePath } from '../../../../hooks/recoil/useActivePath'
import { isFile } from '../../../../utils/isFile'
import { Fade } from '../../../animation/Mount/Fade'
import { DraftManager } from '../DraftManager/DraftManager'
import { MarkdownEditorSkeleton } from './MarkdownEditorSkeleton'
import { Slate } from './Slate/Slate'

export function Editor() {
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
    <Wrapper>
      <Fade show={loading}>
        <MarkdownEditorSkeleton />
      </Fade>
      <Fade show={!loading}>
        <Slate fileContent={fileContent}>
          <DraftManager />
        </Slate>
      </Fade>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: var(--background-primary);
`
