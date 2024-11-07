import {
  ChevronLeft,
  Logout,
  PeopleAlt,
} from '@mui/icons-material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ChecklistIcon from '@mui/icons-material/Checklist';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { useMemo, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { logout } from '../../actions/user.js';
import { useValue } from '../../context/ContextProvider.jsx';
import Users from './users/Users.jsx';
import Journals from './journals/Journals.jsx';
import Problems from './problems/Problems.jsx';
import useCheckToken from '../../hooks/useCheckToken.js';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const SideList = ({ open, setOpen }) => {
  useCheckToken();
  const {
    state: {
      userInfo,
    },
    dispatch,
  } = useValue();

  const [selectedLink, setSelectedLink] = useState('');

  const list = useMemo(
    () => [
      {
        title: 'Задачи отдела',
        icon: <ChecklistIcon />,
        link: 'problems',
        component: <Problems {...{ setSelectedLink, link: 'problems' }} />,
      },
      {
        title: 'Заметки',
        icon: <ListAltIcon />,
        link: 'journals',
        component: <Journals {...{ setSelectedLink, link: 'journals' }} />,
      },
      (userInfo?.is_superuser === true
        ? {
              title: 'Сотрудники отдела',
              icon: <PeopleAlt />,
              link: 'users',
              component: <Users {...{ setSelectedLink, link: 'users' }} />,
            }
        : {}),
    ],
    [userInfo]
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatch);
  };
  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {list.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => navigate(item.link)}
                selected={selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ mx: 'auto', mt: 3, mb: 1 }}>
          <Tooltip title={`${userInfo?.profile?.last_name} ${userInfo?.profile?.first_name} ${userInfo?.profile?.second_name}` || ''}>
            <Avatar
              src={userInfo?.profile?.photoURL}
              {...(open && { sx: { width: 100, height: 100 } })}
            />
          </Tooltip>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          {open && <Typography>{`${userInfo?.profile?.last_name} ${userInfo?.profile?.first_name} ${userInfo?.profile?.second_name}`}</Typography>}
          {open && <Typography variant="body2">{userInfo?.is_superuser ? 'Администратор' : ''}</Typography>}
          {open && (
            <Typography variant="body2">{userInfo?.email}</Typography>
          )}
          <Tooltip title="Выход" sx={{ mt: 1 }}>
            <IconButton onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          {list.map((item) => (
            <Route key={item.title} path={item.link} element={item.component} />
          ))}
          <Route
            path="*"
            element={
              (userInfo?.is_superuser === true) ? (
                <Users {...{ setSelectedLink, link: 'users' }} />
              ) : (
                <Journals {...{ setSelectedLink, link: 'journals' }} />
              )
            }
          />
        </Routes>
      </Box>
    </>
  );
};

export default SideList;
