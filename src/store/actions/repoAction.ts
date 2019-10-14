import {
  File,
  Repo,
} from '../../components/apollo/generated_components_typings'

export type TRepoActions =
  | ReturnType<typeof activeFile>
  | ReturnType<typeof activeRepo>
  | ReturnType<typeof resetRepo>

export enum REPO_ACTIONS {
  ACTIVE_FILE = 'ACTIVE_FILE',
  ACTIVE_REPO = 'ACTIVE_REPO',
  RESET_REPO = 'RESET_REPO',
}

export function activeFile(file: File) {
  return {
    payload: {
      file,
    },
    type: REPO_ACTIONS.ACTIVE_FILE as const,
  }
}

export function activeRepo(repo: Repo) {
  return {
    payload: {
      repo,
    },
    type: REPO_ACTIONS.ACTIVE_REPO as const,
  }
}

export function resetRepo({
  repo,
  file,
}: {
  repo?: boolean
  file?: boolean
} = {}) {
  return {
    payload: {
      file,
      repo,
    },
    type: REPO_ACTIONS.RESET_REPO as const,
  }
}
