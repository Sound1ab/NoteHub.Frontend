import React from 'react'
import SimpleMDE from 'react-simplemde-editor'

import { useCommand } from '../../../hooks'
import { Style } from './MarkdownEditor.styles'

export function MarkdownEditor() {
  const {
    handleSetMarkdownCursorPosition,
    handleSetFileContent,
    fileContent,
    filePath,
  } = useCommand()

  return (
    <Style aria-label="Markdown editor">
      <SimpleMDE
        className="MarkdownEditor-wrapper"
        key={filePath ?? ''}
        onChange={handleSetFileContent}
        value={fileContent}
        getLineAndCursor={handleSetMarkdownCursorPosition}
        options={{
          toolbar: false,
          theme: 'darcula',
        }}
      />
    </Style>
  )
}
