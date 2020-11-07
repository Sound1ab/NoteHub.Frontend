import React from 'react'
import SimpleMDE from 'react-simplemde-editor'

import {
  useEasyMDE,
  useReadCurrentPath,
  useReadFile,
  useUpdateFile,
} from '../../../../../hooks'
import { IPosition } from '../../../../../types'
import { isFile } from '../../../../../utils'
import { ErrorToast } from '../../../../atoms'
import { localState } from '../../../../providers/ApolloProvider/cache'
import { Style } from './MarkdownEditor.styles'
import { renderMarkdown } from './renderMarkdown'
import { renderMdx } from './renderMdx'

export function MarkdownEditor() {
  const currentPath = useReadCurrentPath()
  const { file, error: readError } = useReadFile()
  const [updateFile] = useUpdateFile()
  const { setEasyMDE } = useEasyMDE()

  if (readError) {
    alert('Could not read file. Please try again.')
  }

  async function handleUpdateFile(value: string) {
    try {
      await updateFile(currentPath, value)
    } catch (error) {
      ErrorToast(`There was an issue updating your document. ${error.message}`)
    }
  }

  function handleSetMarkdownCursorPosition(currentCursorPosition: IPosition) {
    localState.cursorPositionVar({
      ...currentCursorPosition,
      __typename: 'Position',
    })
  }

  const shouldRenderMdx = true

  if (!isFile(currentPath)) {
    return null
  }

  return (
    <Style aria-label="Markdown editor">
      <SimpleMDE
        key={file?.path}
        className="MarkdownEditor-wrapper"
        onChange={handleUpdateFile}
        value={file?.content ?? ''}
        getLineAndCursor={handleSetMarkdownCursorPosition}
        options={{
          toolbar: true,
          status: true,
          theme: 'darcula',
          previewRender(text) {
            return shouldRenderMdx ? renderMdx(text) : renderMarkdown(text)
          },
        }}
        getMdeInstance={setEasyMDE}
      />
    </Style>
  )
}
