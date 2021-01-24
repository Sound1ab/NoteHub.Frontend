import React, { useEffect, useState } from 'react'

import { useFs } from '../../../../hooks/fs/useFs'
import { useActivePath } from '../../../../hooks/recoil/useActivePath'
import { isFile } from '../../../../utils/isFile'
import { Fade } from '../../../animation/Mount/Fade'
import { CodeMirror } from '../CodeMirror/CodeMirror'
import { ContextMenu } from '../CodeMirror/ContextMenu/ContextMenu'
import { Widget } from '../CodeMirror/Widget/Widget'
import { DraftManager } from '../DraftManager/DraftManager'
import { MarkdownEditorSkeleton } from './MarkdownEditorSkeleton'

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
    <>
      <Fade show={loading}>
        <MarkdownEditorSkeleton />
      </Fade>
      <Fade show={!loading}>
        <CodeMirror fileContent={fileContent}>
          <Widget />
          <ContextMenu />
          <DraftManager />
        </CodeMirror>
      </Fade>
    </>
  )
}
