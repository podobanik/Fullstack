import axios from 'axios';

const getUserInfo = async (
  { url, body },
  dispatch
) => {
  const headers = { 'Content-Type': 'application/json', authorization: `Bearer ${body}` };
  try {
    const response = await axios.get(url, { headers: headers });
    if (!response.status === 200) {
      if (response.status === 401){
        dispatch({ type: 'UPDATE_USER_INFO', payload: null });
      }; 
      throw new Error(response.statusText);
    }
    return response.data;
  } catch (error) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: { open: true, severity: 'error', message: "Повторите авторизацию!" },
    });
    console.log(error);
    return null;
  }
};

export default getUserInfo;