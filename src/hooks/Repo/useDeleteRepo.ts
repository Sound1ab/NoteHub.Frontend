import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import {
  DeleteRepoMutation,
  DeleteRepoMutationVariables,
  ListReposDocument,
  ListReposQuery,
  ListReposQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { RepoFragment } from '../../fragments'
import { useReadGithubUser } from '../user/useReadGithubUser'

export const DeleteRepoDocument = gql`
  ${RepoFragment}
  mutation DeleteRepo($input: DeleteRepoInput!) {
    deleteRepo(input: $input) {
      ...repo
    }
  }
`

export function useDeleteRepo() {
  const user = useReadGithubUser()

  return useMutation<DeleteRepoMutation, DeleteRepoMutationVariables>(
    DeleteRepoDocument,
    {
      update: (cache, { data }) => {
        const deletedRepo = data && data.deleteRepo
        if (!deletedRepo || !user) return

        const result = cache.readQuery<ListReposQuery, ListReposQueryVariables>(
          {
            query: ListReposDocument,
            variables: {
              username: user.login,
            },
          }
        )

        const repos = result?.listRepos.items ?? []
        const listRepos = result?.listRepos ?? {}

        cache.writeQuery<ListReposQuery, ListReposQueryVariables>({
          data: {
            listRepos: {
              ...listRepos,
              items: repos.filter(repo => repo.id !== deletedRepo.id),
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
