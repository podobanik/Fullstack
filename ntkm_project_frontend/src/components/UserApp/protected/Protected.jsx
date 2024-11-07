import React from 'react';
import { useValue } from '../../../context/ContextProvider.jsx';
import AccessMessage from './AccessMessage.jsx';

const Protected = ({ children }) => {
  const {
    state: { currentUser },
  } = useValue();
  
    return !currentUser || currentUser===undefined ? <AccessMessage /> : children;
};

export default Protected;
