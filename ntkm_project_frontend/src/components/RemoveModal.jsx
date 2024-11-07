import { Button, Dialog, DialogActions, DialogTitle, useMediaQuery, useTheme } from '@mui/material';


const RemoveModal = ({openRemoveModal, handleCloseRemoveModal, handleRemove}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
    <Dialog
        fullScreen={fullScreen}
        open={openRemoveModal}
        onClose={handleCloseRemoveModal}
        aria-labelledby="responsive-dialog-title"
    >
            <DialogTitle id="responsive-dialog-title">
            {"Вы действительно хотите удалить запись?"}
            </DialogTitle>
            <DialogActions>
            <Button autoFocus onClick={handleCloseRemoveModal}>
                Отменить
            </Button>
            <Button onClick={handleRemove}>
                Удалить
            </Button>
            </DialogActions>
    </Dialog>
    );
};

export default RemoveModal;