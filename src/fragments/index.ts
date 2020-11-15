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

export const FileFragment = gql`
  fragment file on File {
    filename
    path
    content
    excerpt
    sha
    type
    url
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

export const GitNodeFragment = gql`
  fragment gitNode on GitNode {
    path
    type
    sha
    url
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
