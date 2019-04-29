import React, { Dispatch, ReducerAction } from 'react'
import AceEditor from 'react-ace'

import 'brace/mode/markdown'
import 'brace/theme/github'
import { INote, INotepad } from '../../../interfaces'
import { IState, TNotepadActions } from '../../../store'

interface IAce {
  activeNotepad: INotepad | null
  activeNote: INote | null
  dispatch: Dispatch<ReducerAction<React.Reducer<IState, TNotepadActions>>>
}

export function Ace({  }: IAce) {
  function handleBlur(e: React.MouseEvent<HTMLDivElement>, editor: any) {
    console.log(e)
    console.log(editor.getValue())
  }

  return (
    <AceEditor
      mode="markdown"
      theme="github"
      name="UNIQUE_ID_OF_DIV"
      height="100%"
      width="100%"
      onBlur={handleBlur as any}
      editorProps={{ $blockScrolling: true }}
    />
  )
}
