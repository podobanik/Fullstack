import axios from 'axios';

const addListItem = async (
  { url, token, addFields },
  dispatch
) => {
  console.log(addFields);
  const headers = { 'Content-Type': 'application/json', authorization: `Bearer ${token.access}` };
  try {
    const response = await axios.post(url, addFields, {headers: headers});
    if (!response.status === 200) {
      throw new Error(response.statusText);
    };
    return true;
  } catch (error) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: { open: true, severity: 'error', message: "Ошибка добавления!" },
    });
    console.log(error);
    return false;
  }
};

export default addListItem;