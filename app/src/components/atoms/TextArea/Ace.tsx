import gql from 'graphql-tag'
import React, { useEffect, useState } from 'react'
import AceEditor from 'react-ace'
import { useMutation, useQuery } from 'react-apollo-hooks'
import { NoteFragment } from '../../../fragments'
import { useStore } from '../../../hooks/useStore'
import {
  ListNotesDocument,
  ListNotesQuery,
  ReadNoteQuery,
  ReadNoteQueryVariables,
  UpdateNoteMutation,
  UpdateNoteMutationVariables,
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

export const UpdateNoteDocument = gql`
  ${NoteFragment}
  mutation UpdateNote($input: UpdateNoteInput!) {
    updateNote(input: $input) {
      ...note
    }
  }
`

export function Ace() {
  const [value, setValue] = useState('')
  const [state] = useStore()

  const updateNote = useMutation<
    UpdateNoteMutation,
    UpdateNoteMutationVariables
  >(UpdateNoteDocument, {
    update: (cache, { data }) => {
      const updatedNote = data && data.updateNote
      if (!updatedNote) return

      const result = cache.readQuery<ListNotesQuery>({
        query: ListNotesDocument,
        variables: {
          filter: { notebookId: { eq: state.activeNotebook } },
        },
      })

      const notes = (result && result.listNotes && result.listNotes.items) || []

      cache.writeQuery<ListNotesQuery>({
        data: {
          listNotes: {
            items: notes
              .filter(
                savedNotes => savedNotes && savedNotes.id !== state.activeNote
              )
              .concat([{ ...updatedNote }]),
          },
        },
        query: ListNotesDocument,
        variables: {
          filter: { notebookId: { eq: state.activeNotebook } },
        },
      })
    },
  })

  const { data: queryData } = useQuery<ReadNoteQuery, ReadNoteQueryVariables>(
    ReadNote,
    {
      variables: {
        id: state.activeNote || '',
      },
    }
  )

  const note = queryData && queryData.readNote

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
