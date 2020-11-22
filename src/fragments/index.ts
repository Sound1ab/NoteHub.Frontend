import { gql } from '@apollo/client'

export const MessagesFragment = gql`
  fragment messages on ModelMessageConnection {
    nodes {
      message
      location {
        start {
          offset
        }
        end {
          offset
        }
      }
    }
  }
`

export const TreeFileFragment = gql`
  fragment treeFile on File {
    id
    path
    type
    url
    sha
  }
`

export const FileFragment = gql`
  ${TreeFileFragment}
  fragment file on File {
    ...treeFile
    filename
    content
    readAt
  }
`

export const RepoFragment = gql`
  fragment repo on Repo {
    name
    description
    private
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

export const FileWithMessagesFragment = gql`
  ${FileFragment}
  ${MessagesFragment}
  fragment fileWithMessages on File {
    ...file
    messages {
      ...messages
    }
  }
`
