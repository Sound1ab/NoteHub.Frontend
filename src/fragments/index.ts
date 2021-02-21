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
    full_name
    updated_at
  }
`

export const ConfigurationFragment = gql`
  fragment configuration on Configuration {
    id
    connectedRepos
  }
`

export const GithubUserFragment = gql`
  ${ConfigurationFragment}
  fragment githubUser on GithubUser {
    id
    login
    avatar_url
    html_url
    name
    configuration {
      ...configuration
    }
  }
`
