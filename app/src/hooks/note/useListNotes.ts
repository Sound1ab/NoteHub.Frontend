import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import {
  ListNotesQuery,
  ListNotesQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { NoteFragment } from '../../fragments'

export const ListNotesDocument = gql`
  ${NoteFragment}
  query ListNotes($filter: ModelNoteFilterInput, $limit: Int, $offset: Int) {
    listNotes(filter: $filter, limit: $limit, offset: $offset) {
      items {
        ...note
      }
    }
  }
`

export function useListNotes(activeNotebook: string | null) {
  const { data } = useQuery<ListNotesQuery, ListNotesQueryVariables>(
    ListNotesDocument,
    {
      variables: {
        filter: { notebookId: { eq: activeNotebook || '' } },
      },
    }
  )

  return (data && data.listNotes && data.listNotes.items) || []
}
