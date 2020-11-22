import React from 'react'
import { useTable } from 'react-table'

import { styled } from '../../../../../../theme'

interface IColumn {
  Header: string
  accessor: string
}

interface ITable {
  columns: IColumn[]
  data: Record<string, string>[]
}

export function Table({ columns, data }: ITable) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            key={headerGroup.getHeaderGroupProps().key}
          >
            {headerGroup.headers.map((column) => (
              <TableHeading
                {...column.getHeaderProps()}
                key={column.getHeaderProps().key}
              >
                {column.render('Header')}
              </TableHeading>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} key={row.getRowProps().key}>
              {row.cells.map((cell) => {
                return (
                  <TableCell
                    {...cell.getCellProps()}
                    key={cell.getCellProps().key}
                  >
                    {cell.render('Cell')}
                  </TableCell>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const TableHeading = styled.th`
  border-bottom: solid 2px ${({ theme }) => theme.colors.accent};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: bold;
  padding: ${({ theme }) => theme.spacing.xs}!important;
`

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.xs}!important;
  border: solid px ${({ theme }) => theme.colors.accent};
  background-color: transparent;
`
