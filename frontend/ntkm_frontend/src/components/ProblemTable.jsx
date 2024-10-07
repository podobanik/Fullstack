import { useState, useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import moment from 'moment'
import EditableCell from "./EditableCell.jsx"


const ProblemTable = (props) => {
  const {problems} = props

  const columns = useMemo(() => [
    {
      accessorKey: 'problem_text',
      header: 'Краткое описание задачи',
      size: 225,
      cell: EditableCell
    },
    {
      accessorKey: 'profile',
      header: 'Ответственный сотрудник',
      cell: (props) => <p>{(props.getValue()).last_name} {(props.getValue()).first_name} {(props.getValue()).second_name}</p>
    },
    {
      accessorKey: 'problem_type',
      header: 'Разновидность задачи',
      cell: (props) => <p>{props.getValue().problem_type_text}</p>
    },
    {
      accessorKey: 'problem_status',
      header: 'Статус выполнения',
      cell: (props) => <p>{props.getValue().problem_status_text}</p>
    },
    {
      accessorKey: 'object_of_work',
      header: 'Место выполнения',
      cell: (props) => <p>{props.getValue().object_of_work_text}</p>
    },
    {
      accessorKey: 'control_date',
      header: 'Контрольный срок',
      cell: (props) => <p>{moment(props.getValue()).format('DD.MM.YYYY')}</p>
    },
    {
      accessorKey: 'change_date',
      header: 'Дата последнего изменения',
      cell: (props) => <p>{moment(props.getValue()).format('DD.MM.YYYY, hh:mm')}</p>
    },
  ], [])

  const data = useMemo(() => problems, [problems])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel:getCoreRowModel(),
    columnResizeMode: "onChange",
    meta:{
      updateData: (rowIndex, columnId, value) => props.resetState(
        prev => prev.map(
          (row, index) =>
            index === rowIndex ? {
              ...prev(rowIndex),
              [columnId]: value,
            }: row
        )
      )
    }
  });
  return <Box>
    <Box className="table" w={table.getTotalSize()}>
      {table.getHeaderGroups().map((headerGroup) => (
        <Box className="tr" key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <Box className="th" w={header.getSize()} key={header.id}>
            {header.column.columnDef.header}
            <Box
              onMouseDown={header.getResizeHandler()}
              onTouchStart={header.getResizeHandler()}
              className={`resizer ${
                header.column.getIsResizing() ? 'isResizing': ''
              }`}
            />
          </Box>
        ))}
        </Box>
      ))}
      {table.getRowModel().rows.map((row) => (
        <Box className="tr" key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <Box className="td" w={cell.column.getSize()} key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Box>
          ))}
        </Box>
        ))}
    </Box>
  </Box>

};
export default ProblemTable;