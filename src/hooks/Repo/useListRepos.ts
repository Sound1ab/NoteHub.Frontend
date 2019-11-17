import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import {
  ListReposQuery,
  ListReposQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { RepoFragment } from '../../fragments'
import { useReadGithubUser } from '../user/useReadGithubUser'

export const ListReposDocument = gql`
  ${RepoFragment}
  query ListRepos {
    listRepos {
      items {
        ...repo
      }
    }
  }
`

export function useListRepos() {
  const user = useReadGithubUser()

  const { data, loading } = useQuery<ListReposQuery, ListReposQueryVariables>(
    ListReposDocument,
    {
      skip: !user,
    }
  )

  return {
    loading,
    repos: data?.listRepos?.items ?? [],
  }
}
