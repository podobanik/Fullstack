import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Typography, Button } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useValue } from '../../../context/ContextProvider.jsx';
import { getProblems } from '../../../actions/problem.js';
import moment from 'moment';
import { grey } from '@mui/material/colors';
import ProblemsActions from './ProblemsActions.jsx';
import AddObjectProblemModal from '../../../components/TaskApp/AddObjectProblemModal.jsx';
import { getUsers } from '../../../actions/user.js';
import { ruRU } from '@mui/material/locale';
import { getValueFromValueOptions } from '@mui/x-data-grid/components/panel/filterPanel/filterPanelUtils.js';
import { getActiveElement } from '@mui/x-data-grid/internals';

const Problems = ({ setSelectedLink, link }) => {
  const {
    state: { problems, problem_status_all, problem_type_all, objects_of_work, users, currentUser},
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(10);
  const [rowId, setRowId] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);


  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  useEffect(() => {
    setSelectedLink(link);
    if (problems.length === 0 && currentUser) getProblems(dispatch, currentUser);
    if (users.length === 0 && currentUser) getUsers(dispatch, currentUser);
  }, []);

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: '№',
        width:40,
        sortable: true,
        filterable: true,
      },
      {
        field: 'problem_text',
        headerName: 'Краткое описание задачи',
        width: 300,
        type: 'text',
        renderCell: (params) =>
          (params.row.problem_text),
        sortable: true,
        filterable: true,
        editable: true,
      },
      {
        field: 'user',
        headerName: 'Сотрудник',
        width: 300,
        type: 'singleSelect',
        valueOptions: users?.map(item => `${item.profile.last_name} ${item.profile.first_name} ${item.profile.second_name}`),
        renderCell: (params) => 
          (`${params.row.user?.profile?.last_name} ${params.row.user?.profile?.first_name} ${params.row.user?.profile?.second_name}`),
        filterable: true,
        sortable: true,
        editable: true,
      },
      {
        field: 'problem_status',
        headerName: 'Статус задачи',
        width: 170,
        type: 'singleSelect',
        valueOptions: problem_status_all?.map(item => item.problem_status_text),
        renderCell: (params) =>
          (params.row.problem_status?.problem_status_text),
        sortable: true,
        filterable: true,
        editable: true,
      },
      {
        field: 'problem_type',
        headerName: 'Категория задачи',
        width: 170,
        type: 'singleSelect',
        valueOptions: problem_type_all?.map(item => item.problem_type_text),
        renderCell: (params) =>
          (params.row.problem_type?.problem_type_text),
        sortable: true,
        filterable: true,
        editable: true,
      },
      {
        field: 'object_of_work',
        headerName: 'Объект АСУТП',
        width: 170,
        type: 'singleSelect',
        valueOptions: objects_of_work?.map(item => item.object_of_work_text),
        renderCell: (params) =>
          (params.row.object_of_work?.object_of_work_text),
        sortable: true,
        filterable: true,
        editable: true,
      },
      {
        field: 'control_date',
        headerName: 'Контрольный срок',
        width: 200,
        renderCell: (params) =>
          moment(params.row.control_date).format('DD.MM.YYYY'),
        sortable: true,
        filterable:true,
        editable: true,
      },
      {
        field: 'actions',
        headerName: 'Действия',
        type: 'actions',
        renderCell: (params) => (
          <ProblemsActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId, users, problem_status_all, problem_type_all, objects_of_work]
  );

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
      >
        Задачи отдела
      </Typography>
      <DataGrid
        columns={columns}
        rows={problems}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        pageSizeOptions={[10, 15, 20]}
        localeText={ruRU}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? grey[200] : grey[900],
          },
        }}
        onCellEditStop={(params) => setRowId(params.row.id)}
      />
      <Button onClick={handleOpenAddModal}>Добавить запись</Button>
      {openAddModal && (
        <AddObjectProblemModal
          openAddModal={openAddModal}
          setOpenAddModal={setOpenAddModal}
          handleCloseAddModal={handleCloseAddModal}
        />
      )}
    </Box>
  );
};

export default Problems;
