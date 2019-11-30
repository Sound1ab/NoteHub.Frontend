import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import {
  ReadFileQuery,
  ReadFileQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'
import { useReadCurrentRepoName } from '../Repo/useReadCurrentRepoName'
import { useReadCurrentFileName } from './useReadCurrentFileName'
import { useReadGithubUser } from '../user/useReadGithubUser'

export const ReadFile = gql`
  ${FileFragment}
  query ReadFile($username: String!, $repo: String!, $filename: String!) {
    readFile(username: $username, repo: $repo, filename: $filename) {
      ...file
    }
  }
`

export function useReadFile() {
  const { currentRepoName } = useReadCurrentRepoName()
  const { currentFileName } = useReadCurrentFileName()
  const user = useReadGithubUser()

  const { data, loading } = useQuery<ReadFileQuery, ReadFileQueryVariables>(
    ReadFile,
    {
      skip: !user?.login || !currentRepoName || !currentFileName,
      variables: {
        filename: currentFileName ?? '',
        repo: currentRepoName ?? '',
        username: user?.login ?? '',
      },
    }
  )

  return { file: data && data.readFile, loading }
}
