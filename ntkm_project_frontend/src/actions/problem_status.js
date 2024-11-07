import getList from './utils/getList';
import updateListItem from './utils/updateListItem';
import addListItem from './utils/addListItem';
import removeListItem from './utils/removeListItem';


const url = 'http://localhost:8000/';


export const getStatuses = async (dispatch, currentUser) => {
  const result = await getList({ url: url + 'problem_status_all/', body: currentUser }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_STATUSES', payload: result });
  };
};


export const addStatusItem = async (addFields, dispatch, currentUser) => {
  const result = await addListItem({ url: url + 'problem_status_all/', token: currentUser, addFields: addFields }, dispatch);
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


export const updateStatusItem = async (updatedFields, itemId, dispatch, currentUser) => {
  const result = await updateListItem({ url: url + 'problem_status_all/', token: currentUser, updatedFields: updatedFields, itemId: itemId }, dispatch);
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


export const removeStatusItem = async (itemId, dispatch, currentUser) => {
  const result = await removeListItem({ url: url + 'problem_status_all/', token: currentUser, itemId: itemId }, dispatch);
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
