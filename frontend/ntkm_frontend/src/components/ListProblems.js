import React, {useMemo} from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect} from 'react-table';
import './table.css';
import { GlobalFilter } from './GlobalFilter';
import moment from 'moment'
import { Checkbox } from './Checkbox';



export const ListProblems = (props) => {
    const {problems} = props
    const {users} = props
    const {problem_status_all} = props
    const {problem_type_all} = props
    const {objects_of_work} = props



    const columns = useMemo(() => [
      {
        Header: 'Краткое описание задачи',
        accessor: 'problem_text'
      },
      {
        Header: 'Ответственный сотрудник',
        accessor: ({user}) => users?.filter(filterUser => filterUser.user_id === user).map(filteredUser => (filteredUser.last_name + " " + filteredUser.first_name + " " + filteredUser.second_name)),
      },
      {
        Header: 'Категория задачи',
        accessor: ({problem_type}) => problem_type_all?.filter(filterType => filterType.id === problem_type).map(filteredType => filteredType.problem_type_text),
      },
      {
        Header: 'Статус задачи',
        accessor: ({problem_status}) => problem_status_all?.filter(filterStatus => filterStatus.id === problem_status).map(filteredStatus => filteredStatus.problem_status_text),
      },
      {
        Header: 'Объект АСУТП',
        accessor: ({object_of_work}) => objects_of_work?.filter(filterObject => filterObject.id === object_of_work).map(filteredObject => filteredObject.object_of_work_text),
      },
      {
        Header: 'Контрольный срок',
        accessor: 'control_date',
        Cell: ({value}) => {return moment(value).format('DD.MM.YYYY')},
      },
      {
        Header: 'Дата добавления',
        accessor: 'add_date',
        Cell: ({value}) => {return moment(value).format('DD.MM.YYYY, hh:mm')},
      }
    ], [objects_of_work, problem_status_all, problem_type_all, users]) 


    const data = useMemo(() => problems, [problems])

    const tableInstanse = useTable({
        columns,
        data,
        initialState: { pageIndex: 0}
      },
      useGlobalFilter,
      useSortBy,
      usePagination,
      useRowSelect,
      (hooks) => {
        hooks.visibleColumns.push((columns) => {
          return [
            {
              id: 'selection',
              Header: ({ getToggleAllRowsSelectedProps}) => (
                <Checkbox {...getToggleAllRowsSelectedProps()} />
              ),
              Cell: ({row}) => (
                <Checkbox {...row.getToggleRowSelectedProps()} />
              ) 
            },
            ...columns
          ]
        })
      }
    )

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      pageOptions,
      nextPage,
      gotoPage,
      pageCount,
      setPageSize,
      previousPage,
      canNextPage,
      canPreviousPage,
      prepareRow,
      state,
      setGlobalFilter,
      allColumns,
      getToggleHideAllColumnsProps,
    } = tableInstanse

    const {globalFilter, pageIndex, pageSize} = state




    return (
    <>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div>
          <div>
            <Checkbox {...getToggleHideAllColumnsProps()} /> Выбрать всё
          </div>
          {
            allColumns.map(column => (
              <div key={column.id}>
                <label>
                  <input type='checkbox' {...column.getToggleHiddenProps()} />
                  {column.Header}
                </label>
              </div>
            ))
          }
        </div>
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
                  return <td key={cell.id} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        <span>
          Страница{' '}
          <strong>
            {pageIndex + 1} из {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          |Перейти на страницу:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
            style={{width: '50px'}}
          />
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
      </div>
      <div align="right">
        <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
          {
            [10, 25, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>Кол-во записей: {pageSize}</option>
            ))
          }
        </select>
      </div>
      {/* <pre>
          <code>
            {JSON.stringify(
              {
                selectedFlatRows: selectedFlatRows.map((row) => row.original)
              },
              null,
              2
            )}
          </code>
        </pre> */}
    </>
  )
}
