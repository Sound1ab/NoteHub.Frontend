import { gql } from '@apollo/client'

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
