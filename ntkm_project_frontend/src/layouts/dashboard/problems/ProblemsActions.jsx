import { Box, CircularProgress, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { Check, Save, Delete } from '@mui/icons-material';
import { green, red } from '@mui/material/colors';
import { getProblems, updateProblemItem, removeProblemItem } from '../../../actions/problem.js';
import { useValue } from '../../../context/ContextProvider.jsx';
import RemoveModal from '../../../components/RemoveModal.jsx';

const ProblemsActions = ({ params, rowId, setRowId }) => {
  const {
    dispatch,
    state: { currentUser },
  } = useValue();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [detailed, setDetailed] = useState(false);

  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
 


  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
  };

  const handleOpenDetailModal = () => {
    setOpenDetailModal(true);
  };

  const handleCloseRemoveModal = () => {
    setOpenRemoveModal(false);
  };

  const handleOpenRemoveModal = () => {
    setOpenRemoveModal(true);
  };

  const handleRemove = async () => {
      const {id} = params.row;
      const remove = await removeProblemItem(
        id,
        dispatch,
        currentUser
      );
      if (remove) {
        setRemoved(true);
        setRowId(null);
        setOpenRemoveModal(false);
        getProblems(dispatch, currentUser);
      }
    };

  const handleSubmit = async () => {
    setLoading(true);

    const { problem_text, id, control_date, problem_type, object_of_work, user, problem_status} = params.row;
    const update = await updateProblemItem(
      { problem_text, control_date, problem_type, object_of_work, user, problem_status },
      id,
      dispatch,
      currentUser
    );
    if (update) {
      setSuccess(true);
      setRowId(null);
      getProblems(dispatch, currentUser);
    }
    setLoading(false);
  };

  useEffect(() => {
		if (removed){
				setRemoved(false)
			}
	}, [removed]);

  useEffect(() => {
		if (rowId === params.row.id && success){
			setTimeout(() => {
				setSuccess(false)
			}, 1000);
		}
	}, [rowId, success]);

  return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.row.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
      {removed ? (
        <Fab
          color="#ff0000"
          sx={{
            width: 40,
            height: 40,
            bgcolor: red[500],
            '&:hover': { bgcolor: red[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="#ff0000"
          sx={{
            width: 40,
            height: 40,
          }}
          onClick={handleOpenRemoveModal}
        >
          <Delete />
        </Fab>
      )}
      {openRemoveModal && ( 
        <RemoveModal
          openRemoveModal={openRemoveModal}
          handleCloseRemoveModal={handleCloseRemoveModal}
          handleRemove={handleRemove}
        />
      )}
    </Box>
  );
};

export default ProblemsActions;
