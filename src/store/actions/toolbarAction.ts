export type TReturnOfIsPreview = ReturnType<typeof isPreview>

export type TToolbarActions =
  | TReturnOfIsPreview

export enum TOOLBAR_ACTIONS {
  IS_PREVIEW = 'IS_PREVIEW',
}

export function isPreview(value: boolean) {
  return {
    payload: {
      value,
    },
    type: TOOLBAR_ACTIONS.IS_PREVIEW,
  }
}