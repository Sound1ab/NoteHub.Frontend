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

export const CreateRepoDocument = gql`
  ${RepoFragment}
  mutation CreateRepo($input: CreateRepoInput!) {
    createRepo(input: $input) {
      ...repo
    }
  }
`

export function useCreateRepo(username: string) {
  return useMutation<CreateRepoMutation, CreateRepoMutationVariables>(
    CreateRepoDocument,
    {
      update: (cache, { data }) => {
        const newRepo = data && data.createRepo
        if (!newRepo) return
        const result = cache.readQuery<ListReposQuery, ListReposQueryVariables>(
          {
            query: ListReposDocument,
            variables: {
              username,
            },
          }
        )

        const repos =
          (result && result.listRepos && result.listRepos.items) || []
        const listRepos = (result && result.listRepos) || []

        cache.writeQuery<ListReposQuery, ListReposQueryVariables>({
          data: {
            listRepos: {
              ...listRepos,
              items: [...repos, newRepo],
            },
          },
          query: ListReposDocument,
          variables: {
            username,
          },
        })
      },
    }
  )
}
