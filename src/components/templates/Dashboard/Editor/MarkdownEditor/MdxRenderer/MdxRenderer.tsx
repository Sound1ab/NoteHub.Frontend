import { Components, MDXProvider } from '@mdx-js/react'
import React, { ReactNode, useMemo } from 'react'
import styled from 'styled-components'

import { useReadFile } from '../../../../../../hooks'
import { ThemeProvider } from '../../../../../providers'
import { ErrorBoundary } from '../../../../../utility'
import { CodeRenderer } from '../../CodeRenderer/CodeRenderer'
import { Table } from '../Table/Table'
import { createElement, transform, transpileMdx } from './utils'

export function MdxRenderer() {
  const { file } = useReadFile()

  const components: Components & { Table: ReactNode } = {
    code: ({ children, className }) => {
      const language = className.replace(/language-/, '')
      return CodeRenderer({
        value: children as string,
        inline: false,
        language,
      })
    },
    // Insert custom components
    Table,
  }

  const element: ReactNode = useMemo(
    () => createElement(transform(transpileMdx(file?.content ?? ''))),
    [file?.content]
  )

  return (
    <ErrorBoundary
      fallback={(errorMessage: string) => (
        <CodeRenderer inline={false} language="html" value={errorMessage} />
      )}
    >
      <ThemeProvider>
        {() => {
          return (
            <MDXProvider components={components}>
              <MdxPreview>{element}</MdxPreview>
            </MDXProvider>
          )
        }}
      </ThemeProvider>
    </ErrorBoundary>
  )
}

const MdxPreview = styled.div`
  flex: 1 1 100%;
  position: relative;
  height: 100%;
  overflow-y: scroll;
  padding: 0 ${({ theme }) => theme.spacing.xs};
`
