import React, {useMemo} from 'react'
import { useTable } from 'react-table'
import { COLUMNS } from './Columns'
import './table.css';
import ModalProblem from "../Problems/ModalProblem.js";
import AppRemoveProblem from "../Problems/appRemoveProblem.js";
import moment from 'moment';


export const BasicTable = (props) => {
    const {problems} = props
    const {users} = props
    const {problem_status_all} = props
    const {problem_type_all} = props
    //const {sectors} = props
    const {objects_of_work} = props

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => problems, [])
  
    const tableInstanse = useTable({
        columns,
        data,
    })

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
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
