import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import {
  ReadNoteQuery,
  ReadNoteQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { NoteFragment } from '../../fragments'

export const ReadNote = gql`
  ${NoteFragment}
  query ReadNote($id: ID!) {
    readNote(id: $id) {
      ...note
    }
  }
`

export function useReadNote(activeNote: string | null) {
  const { data } = useQuery<ReadNoteQuery, ReadNoteQueryVariables>(ReadNote, {
    variables: {
      id: activeNote || '',
    },
  })

  return data && data.readNote
}
