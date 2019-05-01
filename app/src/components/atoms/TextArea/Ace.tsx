import React, { useEffect, useState } from 'react'
import AceEditor from 'react-ace'
import { useStore } from '../../../hooks/useStore'

import 'brace/mode/markdown'
import 'brace/theme/github'
import { useReadNote, useUpdateNote } from '../../../hooks'

export function Ace() {
  const [value, setValue] = useState('')
  const [state] = useStore()
  const note = useReadNote(state.activeNote)
  const updateNote = useUpdateNote(state.activeNotebook, state.activeNote)

  useEffect(() => {
    setValue((note && note.markdown) || '')
  }, [note])

  function handleChange(newValue: string) {
    setValue(newValue)
  }

  async function handleBlur(e: React.MouseEvent<HTMLDivElement>, editor: any) {
    if (!state.activeNote) {
      alert('No active note')
      return
    }
    await updateNote({
      variables: {
        input: {
          excerpt: editor.session.getLine(0),
          id: state.activeNote,
          markdown: editor.getValue(),
        },
      },
    })
  }

  return (
    <AceEditor
      value={value}
      mode="markdown"
      theme="github"
      name="UNIQUE_ID_OF_DIV"
      height="100%"
      width="100%"
      onChange={handleChange}
      onBlur={handleBlur as any}
      wrapEnabled={true}
      editorProps={{ $blockScrolling: true }}
    />
  )
}
