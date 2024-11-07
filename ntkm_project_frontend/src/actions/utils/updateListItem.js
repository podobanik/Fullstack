import axios from 'axios';

const updateListItem = async (
  { url, token, updatedFields, itemId },
  dispatch
) => {
  const headers = { 'Content-Type': 'application/json', authorization: `Bearer ${token.access}` };
  try {
    const response = await axios.patch(url + itemId + '/', updatedFields, {headers: headers});
    if (!response.status === 200) {
      throw new Error(response.statusText);
    };
    return true;
  } catch (error) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: { open: true, severity: 'error', message: "Ошибка изменения!" },
    });
    console.log(error);
    return false;
  }
};

export default updateListItem;