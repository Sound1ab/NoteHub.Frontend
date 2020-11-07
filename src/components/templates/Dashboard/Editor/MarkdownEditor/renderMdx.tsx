import mdx from '@mdx-js/mdx'
import { Components, MDXProvider, mdx as createElement } from '@mdx-js/react'
import { transform as _transform } from 'buble'
import assign from 'core-js/fn/object/assign'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import removeExports from 'remark-mdx-remove-exports'
import removeImports from 'remark-mdx-remove-imports'

import { ErrorToast } from '../../../../atoms'
import { ThemeProvider } from '../../../../providers'
import { CodeRenderer } from '../CodeRenderer/CodeRenderer'

export const _poly = { assign }

const transform = (code: string) =>
  _transform(code, {
    objectAssign: '_poly.assign',
    transforms: {
      dangerousForOf: true,
      dangerousTaggedTemplateString: true,
    },
  }).code

let transpiledBackup = ''
let markupBackup = ''
const ERROR_TEXT =
  'There is an error in the markup. The markup is frozen until fixed'

export const renderMdx = (mdxCode: string) => {
  let jsx = ''

  try {
    jsx = mdx.sync(mdxCode, {
      skipExport: true,
      remarkPlugins: [removeImports, removeExports],
    })
    transpiledBackup = jsx
  } catch (e) {
    jsx = transpiledBackup
    ErrorToast(ERROR_TEXT, { toastId: ERROR_TEXT })
  }

  let code = ''

  try {
    code = transform(jsx)
  } catch {
    return ''
  }

  const scope = { mdx: createElement }

  const fn = new Function(
    '_poly',
    'React',
    ...Object.keys(scope),
    `${code}; return React.createElement(MDXContent)`
  )

  let element = ''

  try {
    element = fn(_poly, React, ...Object.values(scope))
  } catch (e) {
    return ''
  }

  const components: Components = {
    code: ({ children, className }) => {
      const language = className.replace(/language-/, '')
      return CodeRenderer({
        value: children as string,
        inline: false,
        language,
      })
    },
  }

  let markup = ''

  try {
    markup = renderToStaticMarkup(
      <ThemeProvider>
        {() => {
          return <MDXProvider components={components}>{element}</MDXProvider>
        }}
      </ThemeProvider>
    )
    markupBackup = markup
  } catch (e) {
    markup = markupBackup
    ErrorToast(ERROR_TEXT, { toastId: ERROR_TEXT })
  }

  return markup
}
