import monacoEditor, { editor } from 'monaco-editor'
import React, { useContext, useImperativeHandle, useRef } from 'react'
import MonacoEditor, {
  ChangeHandler,
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
  getPosition: () => monacoEditor.Position | undefined | null
  executeEdits: (
    source: string,
    editor: editor.IIdentifiedSingleEditOperation[]
  ) => boolean | undefined | null
  monaco: typeof monacoEditor | null | undefined
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

  const { colorMode, onChange, value } = editorContext

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
        monacoRef?.current?.editor.setValue(value)
      },
      getPosition() {
        return monacoRef?.current?.editor.getPosition()
      },
      executeEdits(source, edits) {
        return monacoRef?.current?.editor.executeEdits(source, edits)
      },
      monaco: monacoRef?.current?.monaco,
    })
  )

  const handleOnChange: ChangeHandler = (newValue, event) => {
    if (event.isFlush) {
      return
    }
    onChange(newValue)
  }

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
      value={value}
      onChange={handleOnChange}
      editorWillMount={editorWillMount}
      editorDidMount={editorDidMount}
    />
  )
})
