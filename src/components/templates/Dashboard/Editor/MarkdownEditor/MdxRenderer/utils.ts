import mdx from '@mdx-js/mdx'
import { mdx as createMdxElement } from '@mdx-js/react'
import { transform as _transform } from 'buble'
import assign from 'core-js/fn/object/assign'
import { Schema } from 'hast-util-sanitize'
import gh from 'hast-util-sanitize/lib/github.json'
import React from 'react'
import parse from 'rehype-parse'
import sanitize from 'rehype-sanitize'
import stringify from 'rehype-stringify'
import removeExports from 'remark-mdx-remove-exports'
import removeImports from 'remark-mdx-remove-imports'
import unified from 'unified'
import { Node } from 'unist'
import visit from 'unist-util-visit'
import { VFile } from 'vfile'

interface INode extends Node {
  value: VFile
}

export function transpileMdx(mdxCode: string) {
  return mdx.sync(mdxCode, {
    skipExport: true,
    remarkPlugins: [removeExports, removeImports],
    rehypePlugins: [sanitizeJsx],
  })
}

const isJSXRegex = /<\/?[A-Z]/

// If we were to pass sanitize directly to rehypePlugins it would remove all
// html elements as rehype will mark these as 'jsx' elements. So we're tapping
// into the tree and visiting each 'jsx' node individually. This allows us sanitize
// the content of the node instead of removing it altogether
export function sanitizeJsx() {
  return (tree: Node) => {
    visit(tree, 'jsx', (node: INode) => {
      if (typeof node.value !== 'string') {
        return
      }

      const html = (node.value as unknown) as string

      if (isJSXRegex.test(html)) {
        return
      }

      node.value = unified()
        .use(parse, { fragment: true })
        .use(stringify, {
          // Means void elements <img> don't break the markdown compiler with
          // a missing trailing slash (/)
          closeSelfClosing: true,
        })
        .use(sanitize, (gh as unknown) as Schema)
        // Pascal case all custom elements so they work as JSX
        .processSync(node.value)
    })
  }
}

export function transform(code: string) {
  return _transform(code, {
    objectAssign: '_poly.assign',
    transforms: {
      dangerousForOf: true,
      dangerousTaggedTemplateString: true,
    },
  }).code
}

export const _poly = { assign }

export function createElement(code: string) {
  const scope = { mdx: createMdxElement }

  const fn = new Function(
    '_poly',
    'React',
    ...Object.keys(scope),
    `${code}; return React.createElement(MDXContent)`
  )

  return fn(_poly, React, ...Object.values(scope))
}
