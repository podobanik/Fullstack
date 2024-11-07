import axios from 'axios';

const getToken = async (
  { url, body },
  dispatch
) => {
  const headers = { 'Content-Type': 'application/json' }
  body = JSON.stringify(body);
  try {
    const response = await axios.post(url, body, {headers: headers});
    if (!response.status === 200) {
      if (response.status === 401){
        dispatch({ type: 'UPDATE_USER', payload: null });
      };
      throw new Error(response.statusText);
    }
    return response.data;
  } catch (error) {
      dispatch({
      type: 'UPDATE_ALERT',
      payload: { open: true, severity: 'error', message: "Указанные учётные данные не найдены!" },
    });
    console.log(error);
    return null;
  }
};

export default getToken;