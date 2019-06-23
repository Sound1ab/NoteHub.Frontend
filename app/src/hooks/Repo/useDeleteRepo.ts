import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import {
  DeleteRepoMutation,
  DeleteRepoMutationVariables,
  ListReposDocument,
  ListReposQuery,
  ListReposQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { RepoFragment } from '../../fragments'

export const DeleteRepoDocument = gql`
  ${RepoFragment}
  mutation DeleteRepo($input: DeleteRepoInput!) {
    deleteRepo(input: $input) {
      ...repo
    }
  }
`

export function useDeleteRepo(username: string) {
  return useMutation<DeleteRepoMutation, DeleteRepoMutationVariables>(
    DeleteRepoDocument,
    {
      update: (cache, { data }) => {
        const deletedRepo = data && data.deleteRepo
        if (!deletedRepo) return

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
        const listRepos = (result && result.listRepos) || {}

        cache.writeQuery<ListReposQuery, ListReposQueryVariables>({
          data: {
            listRepos: {
              ...listRepos,
              items: repos.filter(repo => repo && repo.id !== deletedRepo.id),
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
