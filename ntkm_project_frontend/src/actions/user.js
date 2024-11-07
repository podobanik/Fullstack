import getToken from './utils/user/getToken.js';
import registerUser from './utils/user/registerUser.js';
import getUserInfo from './utils/user/getUserInfo.js';
import getUserId from './utils/user/getUserId.js';
import getList from './utils/getList.js';
import updateListItem from './utils/updateListItem.js';
import addListItem from './utils/addListItem.js';
import removeListItem from './utils/removeListItem.js';


const url = 'http://localhost:8000/';

export const register = async (addFields, dispatch, currentUser) => {
  dispatch({ type: 'START_LOADING' });

  const result = await registerUser(
    { url: url + 'register/', body: addFields, currentUser: currentUser },
    dispatch
  );
  if (result) {
    dispatch({ type: 'CLOSE_LOGIN' });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'Аккаунт был успешно создан!',
      },
    });
  }

  dispatch({ type: 'END_LOADING' });
};


export const login = async (user, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await getToken({ url: url + 'token/', body: user }, dispatch);
  const userId = await getUserId({ url: url + 'user/', body: result.access}, dispatch)
  const userInfo = await getUserInfo({ url: url + 'users/' + userId, body: result.access}, dispatch)
  if (result) {
    dispatch({ type: 'UPDATE_USER', payload: result });
    dispatch({ type: 'UPDATE_USER_INFO', payload: userInfo });
    dispatch({ type: 'CLOSE_LOGIN' });
  }

  dispatch({ type: 'END_LOADING' });
};


export const logout = (dispatch) => {
  dispatch({ type: 'UPDATE_USER', payload: null });
  dispatch({ type: 'UPDATE_USER_INFO', payload: null });
  dispatch({ type: 'UPDATE_USERS', payload: [] });
};


export const getUsers = async (dispatch, currentUser) => {
  dispatch({ type: 'START_LOADING' });
  const sectors = await getList({ url: url + 'sectors/', body: currentUser }, dispatch);
  if (sectors) {
    dispatch({ type: 'UPDATE_SECTORS', payload: sectors });
  };
  const result = await getList({ url: url + 'users/', body: currentUser }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_USERS', payload: result });
  };
  dispatch({ type: 'END_LOADING' });
};


export const addUserItem = async (addFields, dispatch, currentUser) => {
  const result = await addListItem({ url: url + 'users/', token: currentUser, addFields: addFields }, dispatch);
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


export const updateUserItem = async (updatedFields, itemId, dispatch, currentUser) => {
  const result = await updateListItem({ url: url + 'users/', token: currentUser, updatedFields: updatedFields, itemId: itemId }, dispatch);
  if (result) {
    dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: 'Информация успешно обновлена!',
        },
    });
    return true;
  };
  return false;
};


export const removeUserItem = async (itemId, dispatch, currentUser) => {
  const result = await removeListItem({ url: url + 'users/', token: currentUser, itemId: itemId }, dispatch);
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