import getList from './utils/getList';
import updateListItem from './utils/updateListItem';
import addListItem from './utils/addListItem';
import removeListItem from './utils/removeListItem';


const url = 'http://localhost:8000/';


export const getJournals = async (dispatch, currentUser) => {
  dispatch({ type: 'START_LOADING' });
  const result = await getList({ url: url + 'journals/', body: currentUser }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_JOURNALS', payload: result });
  };
  dispatch({ type: 'END_LOADING' });
};


export const addJournalItem = async (addFields, dispatch, currentUser) => {
  console.log(addFields)
  const result = await addListItem({ url: url + 'journals/', token: currentUser, addFields: addFields }, dispatch);
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


export const updateJournalItem = async (updatedFields, itemId, dispatch, currentUser) => {
  const result = await updateListItem({ url: url + 'journals/', token: currentUser, updatedFields: updatedFields, itemId: itemId }, dispatch);
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


export const removeJournalItem = async (itemId, dispatch, currentUser) => {
  const result = await removeListItem({ url: url + 'journals/', token: currentUser, itemId: itemId }, dispatch);
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
