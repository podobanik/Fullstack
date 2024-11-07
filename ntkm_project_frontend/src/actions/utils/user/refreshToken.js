import axios from 'axios';

const refreshToken = async (
  { url, body },
  dispatch
) => {
  console.log(body)
  const headers = { 'Content-Type': 'application/json' };
  try {
    const response = await axios.post(url, {"refresh":body}, {headers: headers});
    if (!response.status === 200) {
      throw new Error(response.statusText);
    }
    console.log(response.data.access);
    return response.data.access;
  } catch (error) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: { open: true, severity: 'error', message: "Требуется повторная авторизация" },
    });
    console.log(error);
    return null;
  }
};

export default refreshToken;