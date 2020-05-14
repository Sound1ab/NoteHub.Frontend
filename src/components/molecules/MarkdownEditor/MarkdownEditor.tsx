import { useApolloClient } from '@apollo/react-hooks'
import React from 'react'
import SimpleMDE from 'react-simplemde-editor'

import { useReadCurrentPath, useReadFile, useUpdateFile } from '../../../hooks'
import { IPosition } from '../../../types'
import { Style } from './MarkdownEditor.styles'

export function MarkdownEditor() {
  const client = useApolloClient()
  const { currentPath } = useReadCurrentPath()
  const [updateFile] = useUpdateFile()
  const { file } = useReadFile()

  function handleSetMarkdownCursorPosition(cursorPosition: IPosition) {
    client.writeData({
      data: { cursorPosition: { ...cursorPosition, __typename: 'Position' } },
    })
  }

  return (
    <Style aria-label="Markdown editor">
      <SimpleMDE
        className="MarkdownEditor-wrapper"
        onChange={value => updateFile(currentPath, value)}
        value={file?.content ?? ''}
        getLineAndCursor={handleSetMarkdownCursorPosition}
        options={{
          toolbar: false,
          status: false,
          theme: 'darcula',
        }}
      />
    </Style>
  )
}
