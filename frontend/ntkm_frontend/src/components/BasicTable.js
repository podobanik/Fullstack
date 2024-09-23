import React, {useMemo} from 'react'
import { useTable, useSortBy } from 'react-table'
import './table.css';
import {COLUMNS} from './Columns'
import '../down.png'
import '../up.png'



export const BasicTable = (props) => {
    const {problems} = props
    // const {users} = props
    // const {problem_type_all} = props
    // const {problem_status_all} = props
    // const {objects_of_work} = props

    // const COLUMNS = [
    //   {
    //       Header: 'Краткое описание задачи',
    //       accessor: 'problem_text'
    //   },
    //   {
    //       Header: 'Ответственный сотрудник',
    //       accessor: 'user',
    //       Cell: ({user}) => {return users?.filter((user_filter) => user_filter.user_id === user).map(filteredUser => (filteredUser.last_name + " " + filteredUser.first_name + " " + filteredUser.second_name))}
    //   },
    //   {
    //       Header: 'Категория задачи',
    //       accessor: 'problem_type',
    //       Cell: ({value}) => {return problem_type_all?.filter((problem_type_filter) => problem_type_filter.id === value).map(filteredProblemType => (filteredProblemType.problem_type_text))}
    //   },
    //   {
    //       Header: 'Статус задачи',
    //       accessor: 'problem_status',
    //       Cell: ({value}) => {return problem_status_all?.filter((problem_status_filter) => problem_status_filter.id === value).map(filteredProblemStatus => (filteredProblemStatus.problem_status_text))}
    //   },
    //   {
    //       Header: 'Объект АСУТП',
    //       accessor: 'object_of_work',
    //       Cell: ({value}) => {return objects_of_work?.filter((object_of_work_filter) => object_of_work_filter.id === value).map(filteredObjectOfWork => (filteredObjectOfWork.object_of_work_text))}
    //   },
    //   {
    //       Header: 'Контрольный срок',
    //       accessor: 'control_date',
    //       Cell: ({value}) => {return moment(value).format('DD.MM.YYYY')}
    //   },
    //   {
    //       Header: 'Дата добавления',
    //       accessor: 'add_date',
    //       Cell: ({value}) => {return moment(value).format('DD.MM.YYYY, hh:mm')}
    //   }
    // ]

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => problems, [problems])
  
    const tableInstanse = useTable({
        columns,
        data
    },
    useSortBy)

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = tableInstanse

    return (
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
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell)=>{
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
          <tr>
            <td>

            </td>
          </tr>
        </tbody>
      </table>
  )
}
