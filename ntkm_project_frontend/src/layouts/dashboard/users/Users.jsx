import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useValue } from '../../../context/ContextProvider.jsx';
import { getUsers } from '../../../actions/user.js';
import moment from 'moment';
import { grey } from '@mui/material/colors';
import UsersActions from './UsersActions.jsx';
import AddObjectUserModal from '../../../components/UserApp/user/AddObjectUserModal.jsx';

const Users = ({ setSelectedLink, link }) => {
  const {
    state: { users, currentUser, userInfo},
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
        field: 'photoURL',
        headerName: 'Фото',
        width: 60,
        renderCell: (params) => <Avatar src={params.row.profile?.photoURL} />,
        sortable: false,
        filterable: false,
      },
      {
        field: 'username',
        headerName: 'Логин',
        width: 170,
        type: 'text',
        renderCell: (params) =>
          (params.row.username),
        sortable: true,
        filterable: true,
        editable: true,
      },
      {
        field: 'email',
        headerName: 'Адрес электронной почты',
        width: 200,
        renderCell: (params) =>
          (params.row.email),
        sortable: true,
        filterable: true,
        editable:true,
      },
      {
        field: 'last_name',
        headerName: 'Фамилия',
        width: 100,
        type: 'text',
        renderCell: (params) =>
          (params.row.profile !== null) ? params.row.profile.last_name : '',
        sortable: true,
        filterable: true,
        editable: true,
      },
      {
        field: 'first_name',
        headerName: 'Имя',
        width: 100,
        type: 'text',
        renderCell: (params) =>
          (params.row.profile !== null) ? params.row.profile.first_name : '',
        sortable:true,
        filterable:true,
        editable: true,
      },
      {
        field: 'second_name',
        headerName: 'Отчество',
        width: 100,
        type: 'text',
        renderCell: (params) =>
          (params.row.profile !== null) ? params.row.profile.second_name : '',
        sortable: true,
        filterable: true,
        editable: true,
      },
      {
        field: 'phone',
        headerName: 'Телефон',
        width: 100,
        type: 'text',
        renderCell: (params) =>
          (params.row.profile !== null) ? params.row.profile.phone : '',
        sortable: true,
        filterable: true,
        editable: true,
      },
      {
        field: 'title',
        headerName: 'Должность',
        width: 200,
        type: 'text',
        renderCell: (params) =>
          (params.row.profile !== null) ? params.row.profile.title : '',
        sortable: true,
        filterable: true,
        editable: true,
      },
      {
        field: 'profile.birthday',
        headerName: 'День рождения',
        width: 120,
        type:'date',
        renderCell: (params) =>
          moment(params.row.profile?.birthday).format('DD.MM.YYYY'),
        sortable: true,
        filterable:true,
        editable: true,
      },
      {
        field: 'date_joined',
        headerName: 'Дата создания',
        width: 150,
        renderCell: (params) =>
          moment(params.row.date_joined).format('DD.MM.YYYY HH:MM'),
      },
      {
        field: 'is_superuser',
        headerName: 'Админ',
        width: 100,
        type: 'singleSelect',
        valueOptions: [true, false],
        renderCell: (params) =>
          (params.row.is_superuser ? 'Да' : 'Нет'),
        sortable:true,
        filterable: true,
        editable: true,
      },
      {
        field: 'actions',
        headerName: 'Действия',
        type: 'actions',
        renderCell: (params) => (
          <UsersActions {...{ params, rowId, setRowId}} />
        ),
      },
    ],
    [rowId]
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
        Список сотрудников
      </Typography>
      <DataGrid
        columns={columns}
        rows={users}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[10, 15, 20]}
        pageSize={pageSize}
        pageSizeOptions={[10, 15, 20]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 3,
          bottom: params.isLastVisible ? 0 : 3,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? grey[200] : grey[900],
          },
        }}
        onCellEditStop={(params) => setRowId(params.row.id)}
      />
      <Button onClick={handleOpenAddModal}>Добавить учётную запись</Button>
      {openAddModal && (
        <AddObjectUserModal
          openAddModal={openAddModal}
          setOpenAddModal={setOpenAddModal}
          handleCloseAddModal={handleCloseAddModal}
        />
      )}
    </Box>
  );
};

export default Users;
