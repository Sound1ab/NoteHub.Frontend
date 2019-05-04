import {
  RESET_ACTION,
  TResetActions,
  TReturnOfIsAuthorized,
  TReturnOfUsername,
  TUserActions,
  USER_ACTIONS,
} from '..'

export const initialUserState = {
  isAuthorized: false,
  username: '',
}

export function userReducer(
  state: typeof initialUserState,
  action: TUserActions | TResetActions
) {
  switch (action.type) {
    case USER_ACTIONS.IS_AUTHORIZED:
      return {
        ...state,
        isAuthorized: (action as TReturnOfIsAuthorized).payload.value,
      }
    case USER_ACTIONS.USERNAME:
      return {
        ...state,
        username: (action as TReturnOfUsername).payload.value,
      }
    case RESET_ACTION.RESET:
      return initialUserState
    default:
      return state
  }
}
