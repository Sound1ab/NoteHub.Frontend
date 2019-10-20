import monacoEditor, { editor } from 'monaco-editor'
import React, { useContext, useImperativeHandle, useRef } from 'react'
import MonacoEditor, {
  EditorDidMount,
  EditorWillMount,
} from 'react-monaco-editor'
import { COLOR_MODE } from '../../../enums'
import { EditorContext } from '../../molecules'

const theme = {
  [COLOR_MODE.DARK]: 'monokai',
  [COLOR_MODE.LIGHT]: 'vs',
}

export interface Ref {
  loadValue: editor.IStandaloneCodeEditor['setValue']
  getPosition: editor.IStandaloneCodeEditor['getPosition']
  executeEdits: editor.IStandaloneCodeEditor['executeEdits']
  monaco: typeof monacoEditor | null
}

interface IMonaco {
  editor: monacoEditor.editor.IStandaloneCodeEditor
  monaco: typeof monacoEditor
}

export const Monaco = React.forwardRef((_, ref) => {
  const editorContext = useContext(EditorContext)
  const monacoRef = useRef<IMonaco | null>(null)

  if (!editorContext) {
    return null
  }

  const { colorMode, onChange } = editorContext

  const editorWillMount: EditorWillMount = monaco => {
    const Monokai = require('monaco-themes/themes/Monokai.json')
    monaco.editor.defineTheme('monokai', Monokai)
    monaco.editor.setTheme('monokai')
  }

  const editorDidMount: EditorDidMount = (edit, monaco) => {
    monacoRef.current = {
      editor: edit,
      monaco,
    }
  }

  useImperativeHandle(
    ref,
    (): Ref => ({
      loadValue(value) {
        monacoRef &&
          monacoRef.current &&
          monacoRef.current.editor.setValue(value)
      },
      getPosition() {
        return (
          monacoRef &&
          monacoRef.current &&
          monacoRef.current.editor.getPosition()
        )
      },
      executeEdits(source, edits, endCursorState) {
        return (
          (monacoRef &&
            monacoRef.current &&
            monacoRef.current.editor.executeEdits(
              source,
              edits,
              endCursorState
            )) ||
          false
        )
      },
      monaco: monacoRef && monacoRef.current && monacoRef.current.monaco,
    })
  )

  return (
    <MonacoEditor
      width="100%"
      height="100%"
      language="markdown"
      theme={theme[colorMode]}
      options={{
        automaticLayout: true,
        fontSize: 11,
        highlightActiveIndentGuide: false,
        lineDecorationsWidth: 0,
        lineNumbers: 'off',
        minimap: { enabled: false },
        overviewRulerBorder: false,
        renderIndentGuides: false,
        scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
        selectOnLineNumbers: true,
        wordWrap: 'on',
      }}
      onChange={onChange}
      editorWillMount={editorWillMount}
      editorDidMount={editorDidMount}
    />
  )
})
