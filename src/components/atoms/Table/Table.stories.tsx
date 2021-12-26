import React, { createRef } from 'react'

import { Table } from './Table'
import { TableCell } from './TableCell/TableCell'
import { TableRow } from './TableRow/TableRow'

const mockElement = {
  children: [],
}

const mockAttributes = {
  'data-slate-node': 'element' as const,
  'data-slate-inline': true as const,
  'data-slate-void': true as const,
  ref: createRef(),
}

export const Primary = () => (
  <Table attributes={mockAttributes} element={mockElement as any}>
    <TableRow
      attributes={mockAttributes}
      element={
        {
          ...mockElement,
          children: [mockElement, mockElement, mockElement] as any,
        } as any
      }
      header={true}
    >
      <TableCell
        attributes={mockAttributes}
        element={mockElement as any}
        header
      >
        one
      </TableCell>
      <TableCell
        attributes={mockAttributes}
        element={mockElement as any}
        header
      >
        one
      </TableCell>
      <TableCell
        attributes={mockAttributes}
        element={mockElement as any}
        header
      >
        one
      </TableCell>
    </TableRow>
    <TableRow attributes={mockAttributes} element={mockElement as any}>
      <TableCell attributes={mockAttributes} element={mockElement as any}>
        one
      </TableCell>
      <TableCell attributes={mockAttributes} element={mockElement as any}>
        one
      </TableCell>
      <TableCell attributes={mockAttributes} element={mockElement as any}>
        one
      </TableCell>
    </TableRow>
  </Table>
)

export const Test = () => {
  return <div>hey</div>
}

export default {
  title: 'Components/Button',
  component: Primary,
}
