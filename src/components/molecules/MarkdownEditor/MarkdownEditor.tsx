import React from 'react'
import SimpleMDE from 'react-simplemde-editor'

import { Command } from '../../../Context'
import { useNonNullableContext } from '../../../hooks'
import { Style } from './MarkdownEditor.styles'

export function MarkdownEditor() {
  const {
    setMarkdownCursorPosition,
    filePath,
    handleSetFileContent,
    fileContent,
  } = useNonNullableContext(Command)

  return (
    <Style aria-label="Markdown editor">
      <SimpleMDE
        className="MarkdownEditor-wrapper"
        key={filePath ?? ''}
        onChange={handleSetFileContent}
        value={fileContent}
        getLineAndCursor={setMarkdownCursorPosition}
        options={{
          toolbar: false,
          theme: 'darcula',
        }}
      />
    </Style>
  )
}
