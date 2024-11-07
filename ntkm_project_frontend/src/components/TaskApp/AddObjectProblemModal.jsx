import { Button, Dialog, DialogActions, DialogContent, MenuItem, Slide, DialogTitle, useMediaQuery, useTheme, TextField, Input, Switch, FormGroup, FormControlLabel } from '@mui/material';
import { forwardRef, useRef, useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import { addProblemItem, getProblems } from '../../actions/problem';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AddObjectProblemModal = ({openAddModal, setOpenAddModal, handleCloseAddModal}) => {
    const problemTextRef = useRef();
    const problemTextExpandRef = useRef();
    const controlDateRef = useRef();
    const userRef = useRef();
    const problemTypeRef = useRef();
    const problemStatusRef = useRef();
    const objectOfWorkRef = useRef();
    const fileRef = useRef();
    const {
    dispatch,
    state: { currentUser, problem_status_all, objects_of_work, problem_type_all, users },
  } = useValue()
    
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleSelectFiles = (e) => {
        setSelectedFiles(e.target.files)
    }
    
    const submitDataAdd = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFiles);
        const file = formData;
        const problem_text = problemTextRef.current.value;
        const problem_text_expand = problemTextExpandRef.current.value;
        const problem_status = problemStatusRef.current.value;
        const problem_type = problemTypeRef.current.value;
        const user = userRef.current.value;
        const object_of_work = objectOfWorkRef.current.value;
        const control_date = controlDateRef.current.value;
        
        const addFields = {
                problem_text: problem_text,
                problem_text_expand: problem_text_expand,
                user: user,
                problem_status: problem_status,
                problem_type: problem_type,
                object_of_work: object_of_work,
                control_date: control_date,
                file: file
            }
        
            const add = await addProblemItem(
                addFields,
                dispatch,
                currentUser
            );
            if (add) {
                setOpenAddModal(false)
                getProblems(dispatch, currentUser);
            }
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
                    id="problem_text"
                    label="Краткое описание задачи"
                    type="text"
                    fullWidth
                    inputRef={problemTextRef}
                    required
                />
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="problem_text_expand"
                    label="Подробное описание задачи"
                    type="text"
                    fullWidth
                    inputRef={problemTextExpandRef}
                    required
                />
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="user"
                    label="Ответственный сотрудник"
                    select
                    fullWidth
                    inputRef={userRef}
                    required
                    helperText="Выберите сотрудника из списка"
                    defaultValue=""
                >
                    {users?.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {`${option.profile.last_name} ${option.profile.first_name} ${option.profile.second_name}`}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="problem_status"
                    label="Статус задачи"
                    select
                    fullWidth
                    inputRef={problemStatusRef}
                    required
                    helperText="Выберите статус задачи"
                    defaultValue=""
                >
                    {problem_status_all?.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.problem_status_text}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="problem_type"
                    label="Категория задачи"
                    select
                    fullWidth
                    inputRef={problemTypeRef}
                    required
                    helperText="Выберите категорию из списка"
                    defaultValue=""
                >
                    {problem_type_all?.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.problem_type_text}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="object_of_work"
                    label="Объект производства работ"
                    select
                    fullWidth
                    inputRef={objectOfWorkRef}
                    required
                    helperText="Выберите объект из списка"
                    defaultValue=""
                >
                    {objects_of_work?.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.object_of_work_text}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="control_date"
                    helperText="Контрольный срок"
                    type="date"
                    fullWidth
                    inputRef={controlDateRef}
                    required
                />
                <input
                    name="file"
                    type="file"  
                    onChange={handleSelectFiles}     
                    multiple        
                />
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

export default AddObjectProblemModal;