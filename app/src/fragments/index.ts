import gql from 'graphql-tag'

export const FileFragment = gql`
  fragment file on File {
    filename
    path
    content
    sha
    _links {
      html
    }
  }
`

export const RepoFragment = gql`
  fragment repo on Repo {
    id
    node_id
    name
    full_name
  }
`

export const GithubUserFragment = gql`
  fragment githubUser on GithubUser {
    id
    login
    avatar_url
    html_url
    name
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
    content
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
