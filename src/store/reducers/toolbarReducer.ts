import { TReturnOfIsPreview, TOOLBAR_ACTIONS, TToolbarActions } from '..'

export const initialToolbarState = {
  isPreview: false,
}

export function toolbarReducer(
  state: typeof initialToolbarState,
  action: TToolbarActions
) {
  switch (action.type) {
    case TOOLBAR_ACTIONS.IS_PREVIEW:
      return {
        ...state,
        isPreview: (action as TReturnOfIsPreview).payload.value,
      }
    default:
      return state
  }
}
