import { useApolloClient } from '@apollo/react-hooks'
import EasyMDE from 'easymde'
import React, { useRef } from 'react'
import SimpleMDE from 'react-simplemde-editor'

import { useReadCurrentPath, useReadFile, useUpdateFile } from '../../../hooks'
import { IPosition } from '../../../types'
import { isFile } from '../../../utils'
import { Style } from './MarkdownEditor.styles'

export function MarkdownEditor() {
  const client = useApolloClient()
  const { currentPath } = useReadCurrentPath()
  const [updateFile] = useUpdateFile()
  const { file } = useReadFile()
  const mdeInstance = useRef<EasyMDE | null>(null)

  function handleSetMarkdownCursorPosition(cursorPosition: IPosition) {
    client.writeData({
      data: { cursorPosition: { ...cursorPosition, __typename: 'Position' } },
    })
  }

  if (!isFile(currentPath)) {
    return null
  }

  function getMdeInstance(instance: EasyMDE) {
    mdeInstance.current = instance
    client.writeData({
      data: { easyMDE: JSON.stringify(instance) },
    })
  }

  function getMde(instance?: EasyMDE | null) {
    if (
      instance === null ||
      instance === undefined ||
      !(instance.constructor as typeof EasyMDE).toggleBold
    ) {
      throw new Error('No mde instance')
    }
    return {
      editor: instance,
      EasyMDE: instance.constructor as typeof EasyMDE,
    }
  }

  function handleClick() {
    const { editor, EasyMDE } = getMde(mdeInstance?.current)
    EasyMDE.toggleBlockquote(editor)
  }

  return (
    <Style aria-label="Markdown editor">
      <button onClick={handleClick}>click</button>
      <SimpleMDE
        key={file?.path}
        className="MarkdownEditor-wrapper"
        onChange={value => updateFile(currentPath, value)}
        value={file?.content ?? ''}
        getLineAndCursor={handleSetMarkdownCursorPosition}
        options={{
          toolbar: true,
          status: true,
          theme: 'darcula',
        }}
        getMdeInstance={getMdeInstance}
      />
    </Style>
  )
}
