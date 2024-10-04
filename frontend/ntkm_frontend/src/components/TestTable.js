import React, {useMemo, useState} from 'react';
import moment from 'moment'
import { Box, Button, ButtonGroup, Icon, Text } from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import EditableCell from "./EditableCell.jsx";
import StatusCell from "./StatusCell.jsx";
import DateCell from "./DateCell.jsx";
import Filters from "./Filters.jsx";
import SortIcon from "./icons/SortIcon";


export const TestTable = (props) => {
    const {problems} = props


    const columns = useMemo(() => [
      {
        accessorKey: 'problem_text',
        header: 'Краткое описание задачи',
        cell: (props) => <p>{props.getValue()}</p>
      },
      {
        accessorKey: 'user',
        header: 'Ответственный сотрудник',
        cell: (props) => <p>`${(props.getValue()).last_name} ${(props.getValue()).first_name} ${(props.getValue()).second_name}`</p>,
      },
      {
        accessorKey: 'problem_type',
        header: 'Категория задачи',
        cell: (props) => <p>`${(props.getValue()).problem_type_text}`</p>,
      },
      {
        accessorKey: 'problem_status',
        Header: 'Статус задачи',
        cell: (props) => <p>`${(props.getValue()).problem_status_text}`</p>,
      },
      {
        accessorKey: 'object_of_work',
        header: 'Объект АСУТП',
        cell: (props) => <p>`${(props.getValue()).object_of_work_text}`</p>,
      },
      {
        accessorKey: 'control_date',
        header: 'Контрольный срок',
        cell: (props) => <p>{moment(props.getValue()).format('DD.MM.YYYY')}</p>,
      },
      {
        accessorKey: 'add_date',
        header: 'Дата добавления',
        cell: (props) => <p>{moment(props.getValue()).format('DD.MM.YYYY, hh:mm')}</p>,
      }
    ], []) 


    const data = useMemo(() => problems, [problems])

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
      });


    return (
    <Box>

    </Box>
  );
};
export default TestTable;
