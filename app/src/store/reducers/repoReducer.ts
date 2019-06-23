import {
  REPO_ACTIONS,
  TRepoActions,
  TReturnOfActiveFile,
  TReturnOfActiveRepo,
  TReturnOfResetRepo,
} from '..'

export const initialRepoState = {
  activeFile: '',
  activeRepo: '',
}

export function repoReducer(
  state: typeof initialRepoState,
  action: TRepoActions
) {
  switch (action.type) {
    case REPO_ACTIONS.ACTIVE_FILE:
      return {
        ...state,
        activeFile: (action as TReturnOfActiveFile).payload.file,
      }
    case REPO_ACTIONS.ACTIVE_REPO:
      return {
        ...state,
        activeRepo: (action as TReturnOfActiveRepo).payload.repo,
      }
    case REPO_ACTIONS.RESET_REPO:
      const { repo, file } = (action as TReturnOfResetRepo).payload
      if ((repo && file) || (!repo && !file)) {
        return initialRepoState
      }
      if (repo) {
        return {
          ...state,
          activeRepo: '',
        }
      }
      if (file) {
        return {
          ...state,
          activeFile: '',
        }
      }
      break
    default:
      return state
  }
}
