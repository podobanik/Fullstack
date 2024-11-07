import getList from './utils/getList';
import updateListItem from './utils/updateListItem';
import addListItem from './utils/addListItem';
import removeListItem from './utils/removeListItem';


const url = 'http://localhost:8000/';


export const getProblems = async (dispatch, currentUser) => {
  dispatch({ type: 'START_LOADING' });
  const problem_status_all = await getList({ url: url + 'problem_status_all/', body: currentUser }, dispatch);
  if (problem_status_all) {
    dispatch({ type: 'UPDATE_STATUSES', payload: problem_status_all });
  };
  const problem_type_all = await getList({ url: url + 'problem_type_all/', body: currentUser }, dispatch);
  if (problem_type_all) {
    dispatch({ type: 'UPDATE_TYPES', payload: problem_type_all });
  };
  const objects_of_work = await getList({ url: url + 'objects_of_work/', body: currentUser }, dispatch);
  if (objects_of_work) {
    dispatch({ type: 'UPDATE_OBJECTS', payload: objects_of_work });
  };
  const result = await getList({ url: url + 'problems/', body: currentUser }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_PROBLEMS', payload: result });
  };
  dispatch({ type: 'END_LOADING' });
};


export const addProblemItem = async (addFields, dispatch, currentUser) => {
  const result = await addListItem({ url: url + 'problems/', token: currentUser, addFields: addFields }, dispatch);
  if (result) {
    dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: 'Информация успешно добавлена!',
        },
    });
    return result;
  };
  return null;
};


export const updateProblemItem = async (updatedFields, itemId, dispatch, currentUser) => {
  const result = await updateListItem({ url: url + 'problems/', token: currentUser, updatedFields: updatedFields, itemId: itemId }, dispatch);
  if (result) {
    dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: 'Информация успешно обновлена!',
        },
    });
    return result;
  };
  return null;
};


export const removeProblemItem = async (itemId, dispatch, currentUser) => {
  const result = await removeListItem({ url: url + 'problems/', token: currentUser, itemId: itemId }, dispatch);
  if (result) {
    dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: 'Запись успешно удалена!',
        },
    });
    return result;
  };
  return null;
};