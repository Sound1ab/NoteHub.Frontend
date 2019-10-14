import {
  REPO_ACTIONS,
  TRepoActions,
} from '..'
import {
  File,
  Repo,
} from '../../components/apollo/generated_components_typings'

const emptyFile: File = {
  _links: {
    html: '',
  },
  content: '',
  excerpt: '',
  filename: '',
  path: '',
  sha: '',
}

const emptyRepo: Repo = {
  description: '',
  full_name: '',
  id: 0,
  name: '',
  node_id: '',
  private: false
}

export const initialRepoState = {
  activeFile: emptyFile,
  activeRepo: emptyRepo,
}

export function repoReducer(
  state: typeof initialRepoState,
  action: TRepoActions
) {
  switch (action.type) {
    case REPO_ACTIONS.ACTIVE_FILE:
      return {
        ...state,
        activeFile: action.payload.file,
      }
    case REPO_ACTIONS.ACTIVE_REPO:
      return {
        ...state,
        activeRepo: action.payload.repo,
      }
    case REPO_ACTIONS.RESET_REPO:
      const { repo, file } = action.payload
      if ((repo && file) || (!repo && !file)) {
        return initialRepoState
      }
      if (repo) {
        return {
          ...state,
          activeRepo: emptyRepo,
        }
      }
      if (file) {
        return {
          ...state,
          activeFile: emptyFile,
        }
      }
      break
    default:
      return state
  }
}
