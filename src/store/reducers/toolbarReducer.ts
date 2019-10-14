import { TOOLBAR_ACTIONS, TToolbarActions } from '..'

export const initialToolbarState = {
  isEdit: true,
}

export function toolbarReducer(
  state: typeof initialToolbarState,
  action: TToolbarActions
) {
  switch (action.type) {
    case TOOLBAR_ACTIONS.SET_IS_PREVIEW:
      return {
        ...state,
        isEdit: action.payload.value,
      }
    default:
      return state
  }
}
