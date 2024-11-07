import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Switch,
} from '@mui/material';
import { Close, Send } from '@mui/icons-material';
import { useValue } from '../../../context/ContextProvider.jsx';
import { useRef } from 'react';
import { updateProfile } from '../../../actions/user.js';

const Profile = () => {
  const {
    state: { profile, userInfo },
    dispatch,
  } = useValue();
  const userNameRef = useRef();
  const isActiveRef = useRef();
  const isStaffRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'UPDATE_PROFILE', payload: { ...profile, open: false } });
    dispatch({ type: 'UPDATE_USER_INFO', payload: userInfo });
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: { ...profile, file, photoURL },
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = userNameRef.current.value;
    const is_active = isActiveRef.current.value;
    const is_staff = isStaffRef.current.value;
    updateProfile(userInfo, { username, is_active, is_staff, file: profile.file }, dispatch);
  };
  return (
    <Dialog open={profile.open} onClose={handleClose}>
      <DialogTitle>
        Профиль
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Вы можете дополнить информацию о себе, заполнив поля ниже:
          </DialogContentText>

          <TextField
            autoFocus
            margin="normal"
            variant="standard"
            id="username"
            label="Логин пользователя"
            type="text"
            fullWidth
            inputRef={userNameRef}
            inputProps={{ minLength: 2 }}
            required
            defaultValue={userInfo?.username}
          />
          <Switch
            id="is_active"
            label="Активный пользователь"
            inputRef={isActiveRef}
            defaultChecked = {userInfo?.is_active}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Switch
            id="is_staff"
            label="Админ"
            inputRef={isStaffRef}
            defaultChecked = {userInfo?.is_staff}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Switch
            id="is_staff"
            label="Суперпользователь"
            inputRef={isSuperUserRef}
            defaultChecked = {userInfo?.is_superuser}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <label htmlFor="profilePhoto">
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: 'none' }}
              onChange={handleChange}
            />
            <Avatar
              src={profile.photoURL}
              sx={{ width: 75, height: 75, cursor: 'pointer' }}
            />
          </label>
        </DialogContent>
        <DialogActions sx={{ px: '19px' }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Обновить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Profile;
