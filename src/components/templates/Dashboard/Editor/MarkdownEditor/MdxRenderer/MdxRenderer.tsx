import { Components, MDXProvider } from '@mdx-js/react'
import React, { ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { ThemeProvider } from '../../../../../providers'
import { CodeRenderer } from '../../CodeRenderer/CodeRenderer'
import { Table } from '../Table/Table'
import { createElement, transform, transpileMdx } from './utils'

interface IMdxRenderer {
  mdxCode: string
}

export function MdxRenderer({ mdxCode }: IMdxRenderer) {
  const components: Components & { Table: ReactNode } = {
    Table,
  }

  let element: ReactNode

  const ErrorDisplay = ({ message }: { message: string }) => (
    <CodeRenderer inline={false} language="html" value={message} />
  )

  try {
    element = createElement(transform(transpileMdx(mdxCode)))
  } catch (error) {
    return <ErrorDisplay message={error.message} />
  }

  try {
    const component = renderToStaticMarkup(
      <ThemeProvider>
        {() => {
          return <MDXProvider components={components}>{element}</MDXProvider>
        }}
      </ThemeProvider>
    )
    return <span dangerouslySetInnerHTML={{ __html: component }} />
  } catch (error) {
    return <ErrorDisplay message={error.message} />
  }
}
