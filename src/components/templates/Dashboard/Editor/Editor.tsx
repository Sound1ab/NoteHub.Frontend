import React, { useEffect } from 'react'
import styled from 'styled-components'

import { useFs } from '../../../../hooks/fs/useFs'
import { useActivePath } from '../../../../hooks/recoil/useActivePath'
import { useSlateValue } from '../../../../hooks/recoil/useSlateValue'
import { isFile } from '../../../../utils/isFile'
import { Fade } from '../../../animation/Mount/Fade'
import { DraftManager } from '../DraftManager/DraftManager'
import { MarkdownEditorSkeleton } from './MarkdownEditorSkeleton'
import { Slate } from './Slate/Slate'
import { remarkToSlate } from './Slate/utils/unifed/remarkToSlate'

export function Editor() {
  const [, setSlateValue] = useSlateValue()
  const [{ readFile }, { loading }] = useFs()
  const [activePath] = useActivePath()

  useEffect(() => {
    if (!isFile(activePath)) {
      return
    }

    async function loadContentFromFS() {
      const markdown = await readFile(activePath)

      setSlateValue(remarkToSlate(markdown ?? ''))
    }

    loadContentFromFS()
  }, [activePath, readFile, setSlateValue])

  return (
    <Wrapper>
      <Fade show={loading}>
        <MarkdownEditorSkeleton />
      </Fade>
      <Fade show={!loading}>
        <Slate />
      </Fade>
      <DraftManager />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: var(--background-primary);
`
