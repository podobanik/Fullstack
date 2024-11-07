import getList from './utils/getList';
import updateListItem from './utils/updateListItem';
import addListItem from './utils/addListItem';
import removeListItem from './utils/removeListItem';


const url = 'http://localhost:8000/';


export const getFolders = async (dispatch, currentUser) => {
  const result = await getList({ url: url + 'folders/', body: currentUser }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_FOLDERS', payload: result });
  };
};


export const addFolderItem = async (addFields, dispatch, currentUser) => {
  const result = await addListItem({ url: url + 'folders/', token: currentUser, addFields: addFields }, dispatch);
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


export const updateFolderItem = async (updatedFields, itemId, dispatch, currentUser) => {
  const result = await updateListItem({ url: url + 'folders/', token: currentUser, updatedFields: updatedFields, itemId: itemId }, dispatch);
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


export const removeFolderItem = async (itemId, dispatch, currentUser) => {
  const result = await removeListItem({ url: url + 'folders/', token: currentUser, itemId: itemId }, dispatch);
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
