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

        const notebooks =
          (result && result.listRepos && result.listRepos.items) || []

        cache.writeQuery<ListReposQuery, ListReposQueryVariables>({
          data: {
            listRepos: {
              items: notebooks.filter(
                notebook => notebook && notebook.id !== deletedRepo.id
              ),
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
