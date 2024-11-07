import { initialState } from './ContextProvider';



const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN':
      return { ...state, openLogin: true };
    case 'CLOSE_LOGIN':
      return { ...state, openLogin: false };

    case 'START_LOADING':
      return { ...state, loading: true };
    case 'END_LOADING':
      return { ...state, loading: false };

    case 'UPDATE_ALERT':
      return { ...state, alert: action.payload };

    case 'UPDATE_USER':
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };

    case 'UPDATE_USER_INFO':
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };

    case 'UPDATE_FOLDER_KEY':
      return { ...state, folder: action.payload };

    case 'UPDATE_USERS':
      return { ...state, users: action.payload };

    case 'UPDATE_SECTORS':
      return { ...state, sectors: action.payload };

    case 'UPDATE_PROBLEMS':
      return { ...state, problems: action.payload };

    case 'UPDATE_JOURNALS':
      return { ...state, journals: action.payload };

    case 'UPDATE_STATUSES':
      return { ...state, problem_status_all: action.payload };
    
    case 'UPDATE_TYPES':
      return { ...state, problem_type_all: action.payload };

    case 'UPDATE_OBJECTS':
      return { ...state, objects_of_work: action.payload };

    case 'UPDATE_FOLDERS':
      return { ...state, folders: action.payload };

    case 'SET_VALUE_USER':
		  return { ...state, valuesUser: { ...state.valuesUser, ...action.payload}};

	  case 'CLEAR_USER_FORM':
		  return { ...state, valuesUser: initialState.valuesUser, isFormReadyToSubmit: false};

	  case 'RESET_VALIDITY_USER':
	    return { ...state, isValidUser: initialState.isValidUser};

	  case 'SUBMIT_USER' : {
		  const emailValidity = state.valuesUser.email?.trim().length;
		  const usernameValidity = state.valuesUser.username?.trim().length;
      const passwordValidity = state.valuesUser.password?.trim().length;
      const isActiveValidity = state.valuesUser.is_active;
      const isStaffValidity = state.valuesUser.is_staff;
      const isSuperuserValidity = state.valuesUser.is_superuser;
      const firstNameValidity = state.valuesUser.profile?.first_name?.trim().length;
      const lastNameValidity = state.valuesUser.profile?.last_name?.trim().length;
      const secondNameValidity = state.valuesUser.profile?.second_name?.trim().length;
      const titleValidity = state.valuesUser.profile?.title?.trim().length;
      const phoneValidity = state.valuesUser.profile?.phone?.trim().length;
      const birthdayValidity = state.valuesUser.profile?.birthday;
      const sectorValidity = state.valuesUser.profile?.sector_text;
      const photoURLValidity = state.valuesUser.profile?.phitoURL;
		  return {
        ...state,
        isValidUser: {
          email: emailValidity,
          username: usernameValidity,
          password: passwordValidity,
          is_active: isActiveValidity,
          is_staff: isStaffValidity,
          is_superuser: isSuperuserValidity, 
          profile:{
            first_name: firstNameValidity,
            last_name: lastNameValidity,
            second_name: secondNameValidity,
            title: titleValidity,
            phone: phoneValidity,
            birthday:birthdayValidity,
            sector: sectorValidity,
            photoURL: photoURLValidity,
          }
        },
        isFormReadyToSubmit: emailValidity && usernameValidity && (passwordValidity >= 8) && firstNameValidity && lastNameValidity && secondNameValidity && titleValidity && phoneValidity && birthdayValidity && sectorValidity && photoURLValidity && isActiveValidity && isStaffValidity && isSuperuserValidity
      };
	  };

    case 'SET_VALUE_PROBLEM':
		  return { ...state, valuesProblem: { ...state.valuesProblem, ...action.payload}};

	  case 'CLEAR_PROBLEM_FORM':
		  return { ...state, valuesProblem: initialState.valuesProblem, isFormReadyToSubmit: false};

	  case 'RESET_VALIDITY_PROBLEM':
	    return { ...state, isValidProblem: initialState.isValidProblem};

	  case 'SUBMIT_PROBLEM' : {
		  const textValidity = state.valuesProblem.problem_text?.trim().length;
		  const typeValidity = state.valuesProblem.problem_type?.trim().length;
      const objectValidity = state.valuesProblem.object_of_work?.trim().length;
      const statusValidity = state.valuesProblem.problem_status;
      const userValidity = state.valuesProblem.user;
      const controlDateValidity = state.valuesProblem.control_date;
      const fileNameValidity = state.valuesProblem.file?.name?.trim().length;
      const fileUploadValidity = state.valuesProblem.file?.upload?.trim().length;
		  return {
        ...state,
        isValidProblem: {
          problem_text: textValidity,
          problem_type: typeValidity,
          object_of_work: objectValidity,
          problem_status: statusValidity,
          user: userValidity,
          control_date: controlDateValidity,
          file: [{
            name: fileNameValidity,
            upload: fileUploadValidity,
          },]
        },
        isFormReadyToSubmit: textValidity && typeValidity && objectValidity && statusValidity && userValidity && controlDateValidity && fileNameValidity && fileUploadValidity
      };
    };

    case 'SET_VALUE_JOURNAL':
		  return { ...state, valuesJournal: { ...state.valuesJournal, ...action.payload}};

	  case 'CLEAR_JOURNAL_FORM':
		  return { ...state, valuesJournal: initialState.valuesJournal, isFormReadyToSubmit: false};

	  case 'RESET_VALIDITY_JOURNAL':
	    return { ...state, isValidJournal: initialState.isValidJournal};

	  case 'SUBMIT_JOURNAL' : {
		  const titleValidity = state.valuesJournal.title?.trim().length;
		  const postValidity = state.valuesJournal.post?.trim().length;
      const folderValidity = (state.valuesJournal.folder != null);
      state.valuesJournal.user = String(action.payload.userInfo?.id);
      console.log(state.valuesJournal.user);
		  return {
        ...state,
        currentUser: action.payload.currentUser,
        dispatch: action.payload.dispatch,
        isValidJournal: {
          title: titleValidity,
          post: postValidity,
          folder: folderValidity,
        },
        isFormReadyToSubmit: titleValidity && postValidity && folderValidity
      };
    };

    case 'SET_VALUE_FOLDER':
		  return { ...state, valuesFolder: { ...state.valuesFolder, ...action.payload}};

	  case 'CLEAR_FOLDER_FORM':
		  return { ...state, valuesFolder: initialState.valuesFolder, isFormReadyToSubmit: false};

	  case 'RESET_VALIDITY_FOLDER':
	    return { ...state, isValidFolder: initialState.isValidFolder};

	  case 'SUBMIT_FOLDER' : {
		  const nameValidity = state.valuesFolder.name?.trim().length;
		  const colorValidity = state.valuesFolder.color?.trim().length;
      const userValidity = state.valuesJournal.user;
		  return {
        ...state,
        isValidFolder: {
          name: nameValidity,
          color: colorValidity,
          user: userValidity,
        },
        isFormReadyToSubmit: nameValidity && colorValidity && userValidity
      };
    };

    default:
      throw new Error('No matched action!');
  };
};

export default reducer;
