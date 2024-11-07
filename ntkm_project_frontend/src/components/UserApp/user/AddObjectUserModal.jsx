import { Button, Dialog, DialogActions, DialogContent, MenuItem, Slide, DialogTitle, useMediaQuery, useTheme, TextField, Input, Switch, FormGroup, FormControlLabel } from '@mui/material';
import { forwardRef, useRef, useState } from 'react';
import { useValue } from '../../../context/ContextProvider';
import PasswordField from './PasswordField';
import { register } from '../../../actions/user';
import { getUsers } from '../../../actions/user';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddObjectUserModal = ({openAddModal, setOpenAddModal, handleCloseAddModal}) => {
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const emailRef = useRef();
    const usernameRef = useRef();
    const isActiveRef = useRef();
    const isStaffRef = useRef();
    const isSuperuserRef = useRef();
    const lastNameRef = useRef();
    const firstNameRef = useRef();
    const secondNameRef = useRef();
    const titleRef = useRef();
    const sectorRef = useRef();
    const birthdayRef = useRef();
    const phoneRef = useRef();
    const {
    dispatch,
    state: { currentUser, sectors },
  } = useValue()
    
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [checkedActive, setCheckedActive] = useState(true);
    const [checkedStaff, setCheckedStaff] = useState(false);
    const [checkedSuperuser, setCheckedSuperuser] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);


    const handleChangeActive = () => {
    setCheckedActive(!checkedActive);
    };

    const handleChangeStaff = () => {
    setCheckedStaff(!checkedStaff);
    };

    const handleChangeSuperuser = () => {
    setCheckedSuperuser(!checkedSuperuser);
    };

    const handleChangePhoto = (e) => {
        setSelectedPhoto(e.target.files[0])
    }

    
    const submitDataAdd = async (e) => {
        e.preventDefault();
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        const email = emailRef.current.value;
        const username = usernameRef.current.value;
        const is_active = isActiveRef.current.value;
        const is_staff = isStaffRef.current.value;
        const is_superuser = isSuperuserRef.current.value;
        const last_name = lastNameRef.current.value;
        const first_name = firstNameRef.current.value;
        const second_name = secondNameRef.current.value;
        const title = titleRef.current.value;
        const sector = sectorRef.current.value;
        const birthday = birthdayRef.current.value;
        const photoURL = formData;
        console.log(photoURL);
        console.log(birthday);
        const phone = phoneRef.current.value;
        if (password !== confirmPassword) {
            return dispatch({
            type: 'UPDATE_ALERT',
            payload: {
            open: true,
            severity: 'error',
            message: 'Пароли не совпадают',
            },
            });
        }else {
            const addFields = {
                email: email,
                username: username,
                password: password,
                is_active: is_active,
                is_staff: is_staff,
                is_superuser: is_superuser,
                profile: {
                    last_name: last_name,
                    first_name: first_name,
                    second_name: second_name,
                    title: title,
                    sector: sector,
                    birthday: birthday,
                    photoURL: photoURL,
                    phone: phone
                }

            }
        
            const add = await register(
                addFields,
                dispatch,
                currentUser
            );
            if (add) {
                setOpenAddModal(false)
                getUsers(dispatch, currentUser);
            }
        };
    };


    return (
    <Dialog
        fullScreen={fullScreen}
        open={openAddModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseAddModal}
        aria-labelledby="responsive-dialog-title"
    >
            <DialogTitle id="responsive-dialog-title">
            {"Заполните форму ниже:"}
            </DialogTitle>
            <form onSubmit={submitDataAdd}>
                <DialogContent dividers>
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
                <PasswordField
                    passwordRef={confirmPasswordRef}
                    id="confirmPassword"
                    label="Подтвердите пароль"
                />
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="username"
                    label="Логин"
                    type="text"
                    fullWidth
                    inputRef={usernameRef}
                    required
                />
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="last_name"
                    label="Фамилия"
                    type="text"
                    fullWidth
                    inputRef={lastNameRef}
                    required
                />
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="last_name"
                    label="Имя"
                    type="text"
                    fullWidth
                    inputRef={firstNameRef}
                    required
                />
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="second_name"
                    label="Отчество"
                    type="text"
                    fullWidth
                    inputRef={secondNameRef}
                    required
                />
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="title"
                    label="Должность"
                    type="text"
                    fullWidth
                    inputRef={titleRef}
                    required
                />
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="birthday"
                    helperText="День рождения"
                    type="date"
                    fullWidth
                    inputRef={birthdayRef}
                    required
                />
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="sector"
                    label="Сектор сотрудника"
                    select
                    fullWidth
                    inputRef={sectorRef}
                    required
                    helperText="Выберите сектор из списка"
                    defaultValue=""
                >
                    {sectors.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.sector_text}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="phone"
                    label="Номер телефона"
                    type="text"
                    fullWidth
                    inputRef={phoneRef}
                    required
                />
                <input
                    name="photoURL"
                    type="file"  
                    onChange={handleChangePhoto}     
                    accept="image/*,"        
                />
                <FormGroup>
                    <FormControlLabel
                    control={
                        <Switch 
                        checked={checkedActive}
                        onChange={handleChangeActive}
                        name="is_active"
                        inputRef={isActiveRef}
                        />
                    }
                    label="Активный пользователь"
                    />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel
                    control={
                        <Switch 
                        checked={checkedStaff}
                        onChange={handleChangeStaff}
                        name="is_staff"
                        inputRef={isStaffRef}
                        />
                    }
                    label="Доступ к админке"
                    />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel
                    control={
                        <Switch 
                        checked={checkedSuperuser}
                        onChange={handleChangeSuperuser}
                        name="is_superuser"
                        inputRef={isSuperuserRef}
                        />
                    }
                    label="Суперпользователь"
                    />
                </FormGroup>
                </DialogContent>
                <DialogActions sx={{ px: '19px' }}>
                <Button type="submit" variant="contained">
                    Сохранить
                </Button>
                <Button onClick={handleCloseAddModal}>
                    Отменить
                </Button>
            </DialogActions>
            </form>
    </Dialog>
    );

};

export default AddObjectUserModal;