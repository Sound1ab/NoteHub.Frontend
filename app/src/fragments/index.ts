import gql from 'graphql-tag'

export const NoteFragment = gql`
  fragment note on Note {
    id
    title
    markdown
    excerpt
    createdAt
    updatedAt
  }
`

export const NotebookFragment = gql`
  fragment notebook on Notebook {
    id
    title
    createdAt
    updatedAt
  }
`

export const UserFragment = gql`
  fragment user on User {
    id
    firstName
    lastName
    email
    createdAt
    updatedAt
  }
`
