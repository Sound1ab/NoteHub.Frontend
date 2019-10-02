import React, { useContext, useRef } from 'react'
import AceEditor from 'react-ace'
import { EditorContext } from '..'
import { COLOR_MODE } from '../../../enums'

import 'brace/mode/markdown'
import 'brace/theme/dracula'
import 'brace/theme/github'

export function Editor() {
  const aceEditor = useRef<any>(null)
  const editor = useContext(EditorContext)

  if (!editor) {
    return null
  }

  return (
    <AceEditor
      ref={aceEditor}
      value={editor.value}
      mode="markdown"
      theme={editor.colorMode === COLOR_MODE.LIGHT ? 'github' : 'dracula'}
      name="UNIQUE_ID_OF_DIV"
      height="100%"
      width="100%"
      onChange={editor.setValue}
      onBlur={editor.saveFile.bind(null, editor.value)}
      wrapEnabled={true}
      editorProps={{ $blockScrolling: true }}
      showGutter={false}
      showPrintMargin={false}
      highlightActiveLine={false}
      commands={[
        {
          bindKey: { win: 'Ctrl-M', mac: 'Command-M' },
          exec: editor.uploadImage,
          name: 'myCommand',
        },
      ]}
    />
  )
}
