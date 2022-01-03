import React, { useEffect } from 'react'
import styled from 'styled-components'

import { useFs } from '../../../../hooks/fs/useFs'
import { useActivePath } from '../../../../hooks/recoil/useActivePath'
import { useSlateValue } from '../../../../hooks/recoil/useSlateValue'
import { useLoading } from '../../../../hooks/utils/useLoading'
import { Fade } from '../../../animation/Mount/Fade'
import { DraftManager } from '../DraftManager/DraftManager'
import { MarkdownEditorSkeleton } from './MarkdownEditorSkeleton'
import { Slate } from './Slate/Slate'
import { remarkToSlate } from './Slate/utils/unifed/remarkToSlate'

export function Editor() {
  const { loading, withLoading } = useLoading()
  const [, setSlateValue] = useSlateValue()
  const { readFile } = useFs()
  const [activePath] = useActivePath()

  useEffect(() => {
    const loadContentFromFS = withLoading(async () => {
      let markdown: string | undefined

      if (activePath !== '') {
        markdown = await readFile(activePath)
      }

      const slateValue = remarkToSlate(markdown ?? '')

      setSlateValue(slateValue)
    })

    loadContentFromFS()
  }, [activePath, readFile, setSlateValue, withLoading])

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
