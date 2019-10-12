import { TReturnOfSetIsPreview, TOOLBAR_ACTIONS, TToolbarActions } from '..'

export const initialToolbarState = {
  isPreview: false,
}

export function toolbarReducer(
  state: typeof initialToolbarState,
  action: TToolbarActions
) {
  switch (action.type) {
    case TOOLBAR_ACTIONS.SET_IS_PREVIEW:
      return {
        ...state,
        isPreview: (action as TReturnOfSetIsPreview).payload.value,
      }
    default:
      return state
  }
}
