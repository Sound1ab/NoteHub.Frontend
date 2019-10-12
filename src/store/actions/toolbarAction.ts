export type TReturnOfSetIsPreview = ReturnType<typeof setIsPreview>

export type TToolbarActions =
  | TReturnOfSetIsPreview

export enum TOOLBAR_ACTIONS {
  SET_IS_PREVIEW = 'SET_IS_PREVIEW',
}

export function setIsPreview(value: boolean) {
  return {
    payload: {
      value,
    },
    type: TOOLBAR_ACTIONS.SET_IS_PREVIEW,
  }
}