import gql from 'graphql-tag'
import React, { useEffect, useState } from 'react'
import AceEditor from 'react-ace'
import { useQuery } from 'react-apollo-hooks'
import { NoteFragment } from '../../../fragments'
import { useStore } from '../../../hooks/useStore'
import {
  ReadNoteQuery,
  ReadNoteQueryVariables,
} from '../../apollo/generated_components_typings'

import 'brace/mode/markdown'
import 'brace/theme/github'

export const ReadNote = gql`
  ${NoteFragment}
  query ReadNote($id: ID!) {
    readNote(id: $id) {
      ...note
    }
  }
`

export function Ace() {
  const [value, setValue] = useState('')
  const [state] = useStore()

  const { data } = useQuery<ReadNoteQuery, ReadNoteQueryVariables>(ReadNote, {
    variables: {
      id: state.activeNote || '',
    },
  })

  const note = data && data.readNote

  console.log(state.activeNote)

  useEffect(() => {
    setValue((note && note.markdown) || '')
  }, [note])

  function handleChange(newValue: string) {
    setValue(newValue)
  }

  function handleBlur(
    e: React.MouseEvent<HTMLDivElement>,
    editor: AceAjax.Document
  ) {
    console.log(e)
    console.log(editor.getValue())
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
      editorProps={{ $blockScrolling: true }}
    />
  )
}
