export type TReturnOfReset = ReturnType<typeof reset>

export type TResetActions = TReturnOfReset

export enum RESET_ACTION {
  RESET = 'RESET',
}

export function reset() {
  return {
    type: RESET_ACTION.RESET,
  }
}
