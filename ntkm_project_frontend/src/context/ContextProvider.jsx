import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import reducer from './reducer';

export const initialState = {
  currentUser: null,
  openLogin: false,
  loading: false,
  alert: { open: false, severity: 'info', message: '' },
  users: [],
  problems: [],
  journals: [],
  folders: [],
  sectors:[],
  problem_status_all: [],
  problem_type_all: [],
  objects_of_work: [],
  userInfo: null,
  isValidFolder: {
		name: true,
		color: true,
    user: true,
	},
	valuesFolder: {
		name: '',
		color: '',
    user: null,
	},
  isValidJournal: {
		post: true,
		title: true,
    folder: true,
	},
	valuesJournal: {
		post: '',
		title: '',
    folder: null,
    user: null,
	},
  isValidProblem: {
		problem_text: true,
		problem_type: true,
    problem_status: true,
    object_of_work: true,
    control_date: true,
    user: true,
    file: [{
      name: true,
      upload: true,
    },]
	},
	valuesProblem: {
		problem_text: '',
		problem_type: '',
    problem_status: null,
    object_of_work: '',
    control_date: new Date(),
    user: null,
    file: [{
      name: '',
      upload: '',
    },]
	},
  isValidUser: {
		email: true,
		username: true,
    is_active: true,
    is_staff:true,
    is_superuser: true,
    password: true,
    profile: {
      first_name: true,
      last_name: true,
      second_name: true,
      sector: true,
      title: true,
      birthday: true,
      phone: true,
      photoURL: true,
    },
	},
	valuesUser: {
		email: '',
		username: '',
    is_active: true,
    is_staff:false,
    is_superuser:false,
    password: '',
    profile: {
      first_name: '',
      last_name: '',
      second_name: '',
      sector: null,
      title: '',
      birthday: '',
      phone: '',
      photoURL: '',
    },
	},
	isFormReadyToSubmit: false,
  folder: null
};

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (currentUser) {
      dispatch({ type: 'UPDATE_USER', payload: currentUser });
      dispatch({ type: 'UPDATE_USER_INFO', payload: userInfo});
    }
  }, []);


  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
