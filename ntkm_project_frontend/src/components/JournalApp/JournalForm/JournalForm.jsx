import styles from './JournalForm.module.css';
import ButtonCustom from '../ButtonCustom/ButtonCustom';
import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import Input from '../Input/Input';
import { useValue } from '../../../context/ContextProvider';
import {Form, Image, Button} from 'react-bootstrap';
import { getJournals } from '../../../actions/journal';


function JournalForm({ onSubmit, data, onDelete }) {
	const {
    state: { folders, userInfo, isValidJournal, isFormReadyToSubmit, valuesJournal, currentUser, modalAcceptRemove },
    dispatch,
  } = useValue();

	const titleRef = useRef();
	const postRef = useRef();
	const folderRef = useRef();


	const focusError = (isValidJournal) => {
		switch(true) {
		case !isValidJournal.title:
			titleRef.current.focus();
			break;
		case !isValidJournal.post:
			postRef.current.focus();
			break;
		case !isValidJournal.folder:
			folderRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		if (!data) {
			dispatch({ type: 'CLEAR_JOURNAL_FORM'});
		}
		dispatch({ type: 'SET_VALUE_JOURNAL', payload: { ...data }});
	}, [data]);

	useEffect(() => {
		let timerId;
		if (!isValidJournal.post || !isValidJournal.title || !isValidJournal.folder) {
			focusError(isValidJournal);
			timerId = setTimeout(() => {
				dispatch({ type: 'RESET_VALIDITY_JOURNAL' });
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValidJournal]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(valuesJournal, dispatch, currentUser);
			dispatch({ type: 'CLEAR_JOURNAL_FORM' });
		}
	}, [isFormReadyToSubmit, valuesJournal, onSubmit, userInfo]);


	const onChange = (e) => {
		dispatch({ type: 'SET_VALUE_JOURNAL', payload: { [e.target.name]: e.target.value }});
	};


	const addJournalItem = (e) => {
		e.preventDefault();
		dispatch({ type: 'SUBMIT_JOURNAL', payload: {currentUser: currentUser, userInfo: userInfo, dispatch: dispatch} });
		getJournals(dispatch, currentUser);
	};

	const deleteJournalItem = () => {
		onDelete(data.id, dispatch, currentUser);
		dispatch({ type: 'CLEAR_JOURNAL_FORM' });
	};

	return (
		<Form className={styles['journal-form']} onSubmit={addJournalItem}>
      		<Form.Group className={styles['form-row']} controlId="JournalForm.Title">
        		<Input appearence="title" type='text' ref={titleRef} onChange={onChange} value={valuesJournal.title} placeholder="Название заметки" name='title' isValid={!isValidJournal.title}/>
				{data?.id && <Button className={styles['delete']} type="button" onClick={deleteJournalItem}>
					<Image src="/archive.svg" alt="Кнопка удалить"/>
				</Button>}
			</Form.Group>
			<Form.Group className={styles['form-row']} controlId="JournalForm.Folder">
				<Image src="/folder.svg" alt="Иконка папки"/>
				<Form.Select appearence="folder"  ref={folderRef} aria-label="select" name='folder' onChange={onChange} className={cn(styles['input-select'], {[styles['invalid']]: !isValidJournal.folder})}>
					<option>{data?.folder?.name}</option>
					{folders?.map((folder)=> (
						<option key={folder.id} value={folder.id}>{folder.name}</option>
					))}
    			</Form.Select>
			</Form.Group>
			<Form.Group controlId="JournalForm.Post">
				<textarea appearence="post" ref={postRef} name="post" id="" onChange={onChange} value={valuesJournal.post} placeholder="Текст заметки" cols="30" rows="10" className={cn(styles['input'], {
				[styles['invalid']]: !isValidJournal.post
				})}></textarea>
			</Form.Group >
			<ButtonCustom>Сохранить</ButtonCustom>
    	</Form>
	);
}

export default JournalForm;