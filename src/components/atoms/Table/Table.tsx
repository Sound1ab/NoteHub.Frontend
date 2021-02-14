import React, { RefObject, useRef } from 'react'
import { RenderElementProps } from 'slate-react/dist/components/editable'
import styled from 'styled-components'

interface IContextProps {
  tableRef: RefObject<HTMLTableElement> | null
}

export const TableContext = React.createContext<Partial<IContextProps>>({})

export function Table({ attributes, children }: RenderElementProps) {
  const tableRef = useRef<HTMLTableElement | null>(null)

  return (
    <TableContext.Provider value={{ tableRef }}>
      <StyledTable {...attributes} ref={tableRef}>
        {children}
      </StyledTable>
    </TableContext.Provider>
  )
}

const StyledTable = styled.table`
  color: var(--text-primary);
  margin: ${({ theme }) => theme.spacing.xs} 0;
`
