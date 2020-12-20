import React from 'react'
import ReactMarkdown from 'react-markdown'
import toc from 'remark-toc'
import styled from 'styled-components'

import { FONT } from '../../../../../../enums'
import { useReadFile, useReadThemeSettings } from '../../../../../../hooks'
import { CodeRenderer } from '../../CodeRenderer/CodeRenderer'
import { MdxRenderer } from '../MdxRenderer/MdxRenderer'

export const MarkdownRenderer = () => {
  const { file } = useReadFile()
  const { font, isFullWidth } = useReadThemeSettings()

  return (
    <Wrapper>
      <Sizer font={font} isFullWidth={isFullWidth}>
        <ReactMarkdown
          source={file?.content ?? ''}
          plugins={[toc]}
          renderers={{
            code: (props) => {
              if (props.language === 'mdx') {
                return <MdxRenderer mdxCode={props.value} />
              }

              return CodeRenderer({ ...props, inline: false })
            },
            inlineCode: (props) => CodeRenderer({ ...props, inline: true }),
          }}
        />
      </Sizer>
    </Wrapper>
  )
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
