import { Components, MDXProvider } from '@mdx-js/react'
import React, { ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import styled from 'styled-components'

import { FONT } from '../../../../../../enums'
import { useReadFile, useReadThemeSettings } from '../../../../../../hooks'
import { ThemeProvider } from '../../../../../providers'
import { CodeRenderer } from '../../CodeRenderer/CodeRenderer'
import { Table } from '../Table/Table'
import { createElement, transform, transpileMdx } from './utils'

export function MdxRenderer() {
  const { file } = useReadFile()
  const { isFullWidth, font } = useReadThemeSettings()

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

  let element: ReactNode

  try {
    element = createElement(transform(transpileMdx(file?.content ?? '')))
  } catch (error) {
    return (
      <Wrapper>
        <CodeRenderer inline={false} language="html" value={error.message} />
      </Wrapper>
    )
  }

  try {
    const component = renderToStaticMarkup(
      <ThemeProvider>
        {() => {
          return (
            <MDXProvider components={components}>
              <Sizer isFullWidth={isFullWidth} font={font}>
                {element}
              </Sizer>
            </MDXProvider>
          )
        }}
      </ThemeProvider>
    )
    return <Wrapper dangerouslySetInnerHTML={{ __html: component }} />
  } catch (error) {
    return (
      <Wrapper>
        <CodeRenderer inline={false} language="html" value={error.message} />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  flex: 1 1 100%;
  position: relative;
  height: 100%;
  overflow-y: scroll;
  padding: ${({ theme }) => theme.spacing.xs};
`

const Sizer = styled.div<{ isFullWidth: boolean; font: FONT }>`
  max-width: ${({ isFullWidth }) => (isFullWidth ? '100%' : '90ch')};

  > * {
    font-family: ${({ font }) => {
      switch (font) {
        case FONT.IS_DEFAULT:
          return `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;!important;`
        case FONT.IS_SERIF:
          return `Lyon-Text, Georgia, YuMincho, "Yu Mincho", "Hiragino Mincho ProN", "Hiragino Mincho Pro", "Songti TC", "Songti SC", "SimSun", "Nanum Myeongjo", NanumMyeongjo, Batang, serif;!important;`
        case FONT.IS_MONO:
          return `iawriter-mono, Nitti, Menlo, Courier, monospace;!important;`
      }
    }};
  }
`
