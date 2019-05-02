export type TReturnOfIsAuthorized = ReturnType<typeof isAuthorized>
export type TReturnOfUsername = ReturnType<typeof username>

export type TUserActions = TReturnOfIsAuthorized | TReturnOfUsername

export enum USER_ACTIONS {
  IS_AUTHORIZED = 'IS_AUTHORIZED',
  USERNAME = 'USERNAME',
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
