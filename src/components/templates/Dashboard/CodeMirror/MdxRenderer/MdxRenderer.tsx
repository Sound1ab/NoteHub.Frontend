import { Components, MDXProvider } from '@mdx-js/react'
import React, { ReactNode } from 'react'

import { ThemeProvider } from '../../../../providers/ThemeProvider/ThemeProvider'
import { ErrorBoundary } from '../../../../utility/ErrorBoundary/ErrorBoundary'
import { CodeRenderer } from '../CodeRenderer/CodeRenderer'
import { TodoList } from '../TodoList/TodoList'
import { createElement, transform, transpileMdx } from './utils'

interface IMdxRenderer {
  mdxCode: string
}

export function MdxRenderer({ mdxCode }: IMdxRenderer) {
  const components: Components & { [x: string]: ReactNode } = {
    TodoList,
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

  return (
    <ErrorBoundary
      fallback={(errorMessage) => <ErrorDisplay message={errorMessage} />}
    >
      <ThemeProvider>
        {() => {
          return <MDXProvider components={components}>{element}</MDXProvider>
        }}
      </ThemeProvider>
    </ErrorBoundary>
  )
}
