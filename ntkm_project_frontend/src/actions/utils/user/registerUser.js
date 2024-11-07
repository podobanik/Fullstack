import axios from 'axios';

const registerUser = async (
  { url, body, currentUser },
  dispatch
) => {
  const headers = { 'Content-Type': 'application/json', authorization: `Bearer ${currentUser.access}` }
  try {
    const response = await axios.post(url, body, {headers:headers});
    if (!response.status === 201) {
      if (response.status === 500)
      throw new Error(response.statusText);
    }
    return true;
  } catch (error) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: { open: true, severity: 'error', message: "Ошибка добавления пользователя" },
    });
    console.log(error);
    return false;
  }
};

export default registerUser;