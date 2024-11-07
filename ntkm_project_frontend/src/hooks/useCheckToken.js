import { useEffect } from 'react';
import { useValue } from '../context/ContextProvider';
import { jwtDecode } from 'jwt-decode';
import refreshToken from '../actions/utils/user/refreshToken.js';

import { logout } from '../actions/user';

const useCheckToken = () => {
  const {
    state: {
      currentUser,
    },
    dispatch,
  } = useValue();
  const refresh_url = 'http://localhost:8000/token/refresh/';
  useEffect(() => {
    if (currentUser) {
      try{
        const decodedToken = jwtDecode(String(currentUser.access));
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          logout(dispatch);
          //const newAccess = refreshToken({ url: refresh_url, body: currentUser.refresh}, dispatch);
          //if (newAccess) {
            //const oldRefresh = currentUser.refresh;
            //const result = {refresh: oldRefresh, access: newAccess,}
            //dispatch({ type: 'UPDATE_USER', payload: result})
          //} else {
          
          //};
        };
      } catch (error) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { open: true, severity: 'error', message: "Требуется повторная авторизация" },
      });
      console.log(error);
      logout(dispatch);
      };
    };
  }, []);
};

export default useCheckToken;
