import axios from 'axios';

const removeListItem = async (
  { url, itemId, token },
  dispatch
) => {
  const headers = { 'Content-Type': 'application/json', authorization: `Bearer ${token.access}` };
  try {
    const response = await axios.delete(url + itemId + '/', {headers: headers});
    if (!response.status === 200) {
      throw new Error(response.statusText);
    };
    return true;
  } catch (error) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: { open: true, severity: 'error', message: "Ошибка удаления!" },
    });
    console.log(error);
    return false;
  }
};

export default removeListItem;