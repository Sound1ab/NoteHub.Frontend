import React, { Dispatch, SetStateAction } from 'react'
import SimpleMDE from 'react-simplemde-editor'

import { IPosition, useFile } from '../../../hooks'
import { Style } from './MarkdownEditor.styles'

interface IMarkdownEditor {
  setPosition: Dispatch<SetStateAction<IPosition>>
}

export function MarkdownEditor({ setPosition }: IMarkdownEditor) {
  const { setValue, loading: isLoadingFile, value, path } = useFile()

  return (
    <Style aria-label="Markdown editor">
      <SimpleMDE
        className="MarkdownEditor-wrapper"
        key={path ?? ''}
        onChange={setValue}
        value={value}
        getLineAndCursor={position => setPosition(position)}
        options={{
          toolbar: false,
          theme: 'darcula',
          status: isLoadingFile,
        }}
      />
    </Style>
  )
}
