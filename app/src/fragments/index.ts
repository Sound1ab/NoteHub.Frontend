import gql from 'graphql-tag'

export const GithubUserFragment = gql`
  fragment githubUser on GithubUser {
    id
    login
  }
`

export const DateFragment = gql`
  fragment date on Date {
    dateLongForm
    dayOfMonth
    dayOfWeek
    month
  }
`

export const NoteFragment = gql`
  ${DateFragment}
  fragment note on Note {
    id
    title
    markdown
    excerpt
    createdAt {
      ...date
    }
    updatedAt {
      ...date
    }
  }
`

export const NotebookFragment = gql`
  ${DateFragment}
  fragment notebook on Notebook {
    id
    title
    createdAt {
      ...date
    }
    updatedAt {
      ...date
    }
  }
`

export const UserFragment = gql`
  ${DateFragment}
  fragment user on User {
    id
    firstName
    lastName
    email
    createdAt {
      ...date
    }
    updatedAt {
      ...date
    }
  }
`
