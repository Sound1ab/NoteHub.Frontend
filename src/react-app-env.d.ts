/// <reference types="react-scripts" />
declare module 'react-typography'
declare module 'react-simple-table'

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

declare module '@mdx-js/mdx'
declare module 'remark-mdx-remove-exports'
declare module 'remark-mdx-remove-imports'

declare module '@mdx-js/react' {
  import * as React from 'react'
  type ComponentType =
    | 'a'
    | 'blockquote'
    | 'code'
    | 'delete'
    | 'em'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'hr'
    | 'img'
    | 'inlineCode'
    | 'li'
    | 'ol'
    | 'p'
    | 'pre'
    | 'strong'
    | 'sup'
    | 'table'
    | 'td'
    | 'thematicBreak'
    | 'tr'
    | 'ul'
  export type Components = {
    [key in ComponentType]?: React.ComponentType<{
      children: React.ReactNode
      className: string
    }>
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface MDXProviderProps {
    children: React.ReactNode
    components: Components
  }
  export class MDXProvider extends React.Component<MDXProviderProps> {}

  export class mdx {}
}

declare module 'retext-spell'
declare module 'dictionary-en-gb'
declare module 'retext-latin'
declare module 'retext-stringify'
declare module 'retext-repeated-words'
declare module 'retext-equality'
declare module 'retext-indefinite-article'
declare module 'remark-retext'
declare module 'parse-english'
declare module 'remark-extract-frontmatter'
declare module 'remark-frontmatter'
declare module 'retext-readability'
