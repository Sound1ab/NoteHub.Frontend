export type TToolbarActions =
  | ReturnType<typeof setIsEdit>

export enum TOOLBAR_ACTIONS {
  SET_IS_PREVIEW = 'SET_IS_PREVIEW',
}

export function setIsEdit(value: boolean) {
  return {
    payload: {
      value,
    },
    type: TOOLBAR_ACTIONS.SET_IS_PREVIEW as const,
  }
}