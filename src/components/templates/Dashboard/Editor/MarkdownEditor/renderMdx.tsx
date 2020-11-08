import mdx from '@mdx-js/mdx'
import { Components, MDXProvider, mdx as createMdxElement } from '@mdx-js/react'
import { transform as _transform } from 'buble'
import assign from 'core-js/fn/object/assign'
import { Schema } from 'hast-util-sanitize'
import gh from 'hast-util-sanitize/lib/github.json'
import React, { ReactNode } from 'react'
import ReactDOMServer, { renderToStaticMarkup } from 'react-dom/server'
import parse from 'rehype-parse'
import sanitize from 'rehype-sanitize'
import stringify from 'rehype-stringify'
import removeExports from 'remark-mdx-remove-exports'
import removeImports from 'remark-mdx-remove-imports'
import unified from 'unified'
import { Node } from 'unist'
import visit from 'unist-util-visit'
import { VFileCompatible } from 'vfile'

import { ThemeProvider } from '../../../../providers'
import { CodeRenderer } from '../CodeRenderer/CodeRenderer'
import { TestButton } from './TestButton'

// Any custom react components must be added to tagNames in lower case as
// rehype-stringify lowercases all elements meaning the component would never
// pass sanitization. We will convert back to pascal case after sanitization
const customComponents = {
  TestButton: 'testbutton',
}

// The sanitization wont allow through anything that isn't in this schema.
// Allowing all data* props on custom components incase we need to pass props
// down the line.
const schema = {
  ...gh,
  tagNames: [...gh.tagNames, 'testbutton'],
  attributes: {
    ...gh.attributes,
    // Allow all data- attributes on custom components
    ...Object.values(customComponents).reduce((acc, element) => {
      acc[element] = ['data*']
      return acc
    }, {} as Record<string, string[]>),
  },
}

export const _poly = { assign }

const transform = (code: string) =>
  _transform(code, {
    objectAssign: '_poly.assign',
    transforms: {
      dangerousForOf: true,
      dangerousTaggedTemplateString: true,
    },
  }).code

// rehype-stringify lowercases all element names. This means it passes
// the sanitization but they need to be converted back to render as JSX components
function replaceCustomElementsWithJsx() {
  return (tree: Node) => {
    visit(tree, 'element', (node: Node) => {
      Object.entries(customComponents).forEach(([component, element]) => {
        if (node.tagName === element) {
          node.tagName = component
        }
      })
    })
  }
}

// If we were to pass sanitize directly to rehypePlugins it would remove all
// html elements as rehype will mark these as 'jsx' elements. So we're tapping
// into the tree and visiting each 'jsx' node individually. This allows us sanitize
// the content of the node instead of removing it altogether
function sanitizeJsx() {
  return (tree: Node) => {
    visit(tree, 'jsx', (node: Node) => {
      node.value = unified()
        .use(parse)
        .use(stringify, {
          // Means void elements <img> don't break the markdown compiler with
          // a missing trailing slash (/)
          closeSelfClosing: true,
        })
        .use(sanitize, (schema as unknown) as Schema)
        // Pascal case all custom elements so they work as JSX
        .use(replaceCustomElementsWithJsx)
        .processSync(node.value as VFileCompatible)
    })
  }
}

function transpileMdx(mdxCode: string) {
  return mdx.sync(mdxCode, {
    skipExport: true,
    remarkPlugins: [removeImports, removeExports],
    rehypePlugins: [sanitizeJsx],
  })
}

function renderMarkup(element: ReactNode) {
  const components: Components & { TestButton: ReactNode } = {
    code: ({ children, className }) => {
      const language = className.replace(/language-/, '')
      return CodeRenderer({
        value: children as string,
        inline: false,
        language,
      })
    },
    TestButton,
  }

  return renderToStaticMarkup(
    <ThemeProvider>
      {() => {
        return <MDXProvider components={components}>{element}</MDXProvider>
      }}
    </ThemeProvider>
  )
}

function createElement(code: string) {
  const scope = { mdx: createMdxElement }

  const fn = new Function(
    '_poly',
    'React',
    ...Object.keys(scope),
    `${code}; return React.createElement(MDXContent)`
  )

  return fn(_poly, React, ...Object.values(scope))
}

export const renderMdx = (mdxCode: string) => {
  try {
    return renderMarkup(createElement(transform(transpileMdx(mdxCode))))
  } catch (error) {
    return ReactDOMServer.renderToString(
      <CodeRenderer inline={false} language="html" value={error.message} />
    )
  }
}
