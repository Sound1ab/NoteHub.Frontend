import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  DeleteRepoMutation,
  DeleteRepoMutationVariables,
} from '../../components/apollo/generated_components_typings'
import { RepoFragment } from '../../fragments'
import { useReadGithubUser } from '..'

export const DeleteRepoDocument = gql`
  ${RepoFragment}
  mutation DeleteRepo {
    deleteRepo {
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

        // const result = cache.readQuery<ListReposQuery, ListReposQueryVariables>(
        //   {
        //     query: ListReposDocument,
        //     variables: {
        //       username: user.login,
        //     },
        //   }
        // )
        //
        // const repos = result?.listRepos.items ?? []
        // const listRepos = result?.listRepos ?? {}
        //
        // cache.writeQuery<ListReposQuery, ListReposQueryVariables>({
        //   data: {
        //     listRepos: {
        //       ...listRepos,
        //       items: repos.filter(repo => repo.id !== deletedRepo.id),
        //     },
        //   },
        //   query: ListReposDocument,
        //   variables: {
        //     username: user.login,
        //   },
        // })

        function deleteFileKeysFromCache() {
          if (!deletedRepo || !user) return

          const listFilesVariables = {
            repo: deletedRepo.name,
            username: user.login,
          }

          const key = `\\$ROOT_QUERY.listFiles\\(${JSON.stringify(
            listFilesVariables
          )}\\)`

          const regex = new RegExp(key, 'gi')

          Object.keys((cache as any).data.data).forEach(key => {
            if (key.match(regex)) {
              ;(cache as any).data.delete(key)
            }
          })
        }

        deleteFileKeysFromCache()
      },
    }
  )
}
