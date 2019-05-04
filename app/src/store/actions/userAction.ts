export type TReturnOfIsAuthorized = ReturnType<typeof isAuthorized>
export type TReturnOfUsername = ReturnType<typeof username>
export type TReturnOfResetUser = ReturnType<typeof resetUser>

export type TUserActions =
  | TReturnOfIsAuthorized
  | TReturnOfUsername
  | TReturnOfResetUser

export enum USER_ACTIONS {
  IS_AUTHORIZED = 'IS_AUTHORIZED',
  USERNAME = 'USERNAME',
  RESET_USER = 'RESET_USER',
}

export function isAuthorized(value: boolean) {
  return {
    payload: {
      value,
    },
    type: USER_ACTIONS.IS_AUTHORIZED,
  }
}

export function username(value: string) {
  return {
    payload: {
      value,
    },
    type: USER_ACTIONS.USERNAME,
  }
}

export function resetUser() {
  return {
    type: USER_ACTIONS.RESET_USER,
  }
}
