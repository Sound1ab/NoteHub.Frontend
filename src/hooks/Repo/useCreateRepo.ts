import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  CreateRepoMutation,
  CreateRepoMutationVariables,
  ListReposQuery,
  ListReposQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { RepoFragment } from '../../fragments'
import { ListReposDocument } from './useListRepos'
import { useReadGithubUser } from '..'

export const CreateRepoDocument = gql`
  ${RepoFragment}
  mutation CreateRepo($input: CreateRepoInput!) {
    createRepo(input: $input) {
      ...repo
    }
  }
`

export function useCreateRepo() {
  const user = useReadGithubUser()

  return useMutation<CreateRepoMutation, CreateRepoMutationVariables>(
    CreateRepoDocument,
    {
      update: (cache, { data }) => {
        const newRepo = data && data.createRepo
        if (!newRepo || !user) return
        const result = cache.readQuery<ListReposQuery, ListReposQueryVariables>(
          {
            query: ListReposDocument,
            variables: {
              username: user.login,
            },
          }
        )

        const repos = result?.listRepos.items ?? []
        const listRepos = result?.listRepos ?? []

        cache.writeQuery<ListReposQuery, ListReposQueryVariables>({
          data: {
            listRepos: {
              ...listRepos,
              items: [...repos, newRepo],
            },
          },
          query: ListReposDocument,
          variables: {
            username: user.login,
          },
        })
      },
    }
  )
}
