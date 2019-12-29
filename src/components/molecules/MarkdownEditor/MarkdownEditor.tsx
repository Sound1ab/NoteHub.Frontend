import React from 'react'
import SimpleMDE from 'react-simplemde-editor'

import { Command } from '../../../Context'
import { useFile, useNonNullableContext } from '../../../hooks'
import { Style } from './MarkdownEditor.styles'

export function MarkdownEditor() {
  const { setMarkdownCursorPosition } = useNonNullableContext(Command)
  const { setValue, loading: isLoadingFile, value, path } = useFile()

  return (
    <Style aria-label="Markdown editor">
      <SimpleMDE
        className="MarkdownEditor-wrapper"
        key={path ?? ''}
        onChange={setValue}
        value={value}
        getLineAndCursor={setMarkdownCursorPosition}
        options={{
          toolbar: false,
          theme: 'darcula',
          status: isLoadingFile,
        }}
      />
    </Style>
  )
}
