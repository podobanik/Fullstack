import React, {useMemo} from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination} from 'react-table'
import './table.css';
import {COLUMNS} from './Columns'
import { GlobalFilter } from './GlobalFilter';




export const ListProblems = (props) => {
    const {problems} = props

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => problems, [problems])

    const tableInstanse = useTable({
        columns,
        data
      },
      useGlobalFilter,
      useSortBy,
      usePagination
    )

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      nextPage,
      previousPage,
      canNextPage,
      canPreviosPage,
      prepareRow,
      state,
      setGlobalFilter,
    } = tableInstanse

    const {globalFilter} = state

    return (
    <>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? '  ↑' : '  ↓') : '   '}
                    </span>
                  </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell)=>{
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => previousPage()} disabled={!canPreviosPage}><h3><b>←</b></h3></button>
        <button onClick={() => nextPage()} disabled={!canNextPage}><h3><b>→</b></h3></button>
      </div>
    </>
  )
}
