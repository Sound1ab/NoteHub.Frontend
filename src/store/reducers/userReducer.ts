import {
  TUserActions,
  USER_ACTIONS,
} from '..'

export const initialUserState = {
  isAuthorized: false,
  username: '',
}

export function userReducer(
  state: typeof initialUserState,
  action: TUserActions
) {
  switch (action.type) {
    case USER_ACTIONS.IS_AUTHORIZED:
      return {
        ...state,
        isAuthorized: action.payload.value,
      }
    case USER_ACTIONS.USERNAME:
      return {
        ...state,
        username: action.payload.value,
      }
    case USER_ACTIONS.RESET_USER:
      return initialUserState
    default:
      return state
  }
}
