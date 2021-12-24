import React, { useEffect } from 'react'
import styled from 'styled-components'

import { useSlateValue } from '../../../../hooks/context/useSlateValue'
import { useFs } from '../../../../hooks/fs/useFs'
import { useActivePath } from '../../../../hooks/recoil/useActivePath'
import { Fade } from '../../../animation/Mount/Fade'
import { DraftManager } from '../DraftManager/DraftManager'
import { MarkdownEditorSkeleton } from './MarkdownEditorSkeleton'
import { Slate } from './Slate/Slate'
import { remarkToSlate } from './Slate/utils/unifed/remarkToSlate'

export function Editor() {
  const { setSlateValue } = useSlateValue()
  const {
    actions: { readFile },
    meta: { loading },
  } = useFs()
  const [activePath] = useActivePath()

  useEffect(() => {
    const loadContentFromFS = async () => {
      let markdown: string | undefined

      if (activePath !== '') {
        markdown = await readFile(activePath)
      }

      setSlateValue?.(remarkToSlate(markdown ?? ''))
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
  grid-area: editor;
  background-color: var(--background-primary);
`
