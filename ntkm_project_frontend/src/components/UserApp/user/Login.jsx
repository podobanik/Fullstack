import { Close, Send } from '@mui/icons-material';
import {
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
import { useEffect, useRef, useState } from 'react';
import { login, register } from '../../../actions/user.js';
import { useValue } from '../../../context/ContextProvider.jsx';
import PasswordField from './PasswordField.jsx';

const Login = () => {
  const {
    state: { openLogin },
    dispatch,
  } = useValue();
  const title ='Авторизация';
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_LOGIN' });
    setIsRegister(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    
    return login({ email, password }, dispatch);
  };


  return (
    <Dialog open={openLogin} onClose={handleClose}>
      <DialogTitle>
        {title}
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
            Пожалуйста заполните выделенные поля
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            variant="standard"
            id="email"
            label="Адрес электронной почты"
            type="email"
            fullWidth
            inputRef={emailRef}
            required
          />
          <PasswordField {...{ passwordRef }} />
        </DialogContent>
        <DialogActions sx={{ px: '19px' }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Авторизоваться
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Login;
