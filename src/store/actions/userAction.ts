export type TUserActions =
  | ReturnType<typeof isAuthorized>
  | ReturnType<typeof username>
  | ReturnType<typeof resetUser>

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
    type: USER_ACTIONS.IS_AUTHORIZED as const,
  }
}

export function username(value: string) {
  return {
    payload: {
      value,
    },
    type: USER_ACTIONS.USERNAME as const,
  }
}

export function resetUser() {
  return {
    type: USER_ACTIONS.RESET_USER as const,
  }
}
