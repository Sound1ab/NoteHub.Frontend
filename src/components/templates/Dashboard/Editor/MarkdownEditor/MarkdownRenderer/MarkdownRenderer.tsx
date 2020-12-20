import React from 'react'
import ReactMarkdown from 'react-markdown'
import toc from 'remark-toc'
import styled from 'styled-components'

import { useReadFile } from '../../../../../../hooks'
import { CodeRenderer } from '../../CodeRenderer/CodeRenderer'
import { MdxRenderer } from '../MdxRenderer/MdxRenderer'

export const MarkdownRenderer = () => {
  const { file } = useReadFile()

  return (
    <Wrapper>
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
