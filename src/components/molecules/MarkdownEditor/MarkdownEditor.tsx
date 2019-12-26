import React from 'react'
import SimpleMDE from 'react-simplemde-editor'

import { useFile } from '../../../hooks'
import { Style } from './MarkdownEditor.styles'

export function MarkdownEditor() {
  const { setValue, loading: isLoadingFile, value, path } = useFile()

  return (
    <Style>
      <SimpleMDE
        className="MarkdownEditor-wrapper"
        key={path ?? ''}
        onChange={setValue}
        value={value}
        options={{
          toolbar: false,
          theme: 'darcula',
          status: isLoadingFile,
        }}
      />
    </Style>
  )
}
