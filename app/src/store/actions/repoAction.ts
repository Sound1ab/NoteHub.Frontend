export type TReturnOfActiveFile = ReturnType<typeof activeFile>
export type TReturnOfActiveRepo = ReturnType<typeof activeRepo>
export type TReturnOfResetRepo = ReturnType<typeof resetRepo>

export type TRepoActions =
  | TReturnOfActiveFile
  | TReturnOfActiveRepo
  | TReturnOfResetRepo

export enum REPO_ACTIONS {
  ACTIVE_FILE = 'ACTIVE_FILE',
  ACTIVE_REPO = 'ACTIVE_REPO',
  RESET_REPO = 'RESET_REPO',
}

export function activeFile(file: string | null) {
  return {
    payload: {
      file,
    },
    type: REPO_ACTIONS.ACTIVE_FILE,
  }
}

export function activeRepo(repo: string | null) {
  return {
    payload: {
      repo,
    },
    type: REPO_ACTIONS.ACTIVE_REPO,
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
    type: REPO_ACTIONS.RESET_REPO,
  }
}
