import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import {
  CreateRepoMutation,
  CreateRepoMutationVariables,
  ListReposDocument,
  ListReposQuery,
  ListReposQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { RepoFragment } from '../../fragments'
import { useReadGithubUser } from '../user/useReadGithubUser'

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
              username: user.name,
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
            username: user.name,
          },
        })
      },
    }
  )
}
