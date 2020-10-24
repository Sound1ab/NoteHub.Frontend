/// <reference types="react-scripts" />
declare module 'react-typography'

type Maybe<T> = T | null

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Global {
      document: Document
      window: Window
      navigator: Navigator
    }
  }
}
