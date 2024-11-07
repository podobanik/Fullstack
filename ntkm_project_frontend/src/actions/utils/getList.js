import axios from 'axios';

const getList = async (
  { url, body },
  dispatch
) => {
  const headers = { 'Content-Type': 'application/json', authorization: `Bearer ${body.access}` };
  try {
    const response = await axios.get(url, { headers: headers });
    if (!response.status === 200) {
      throw new Error(response.statusText);
    }
    return response.data;
  } catch (error) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: { open: true, severity: 'error', message: "Ошибка получения данных!" },
    });
    console.log(error);
    return [];
  }
};

export default getList;